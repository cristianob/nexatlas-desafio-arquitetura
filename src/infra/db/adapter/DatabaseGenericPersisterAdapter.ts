import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collection, Database, Model } from '@nozbe/watermelondb'
import { UniqueEntityID } from '@/core/domain'
import { Entity, EntityProps } from '@/core/domain/Entity'
import {
  PersisterCollectionObserver,
  PersisterCreator,
  PersisterDeleter,
  PersisterGetCollection,
  PersisterGetter,
  PersisterObserver,
  PersisterUpdater
} from '@/domain/protocols/ModelPersister'

export abstract class DatabaseGenericPersisterAdapter<
  DomainModelProps extends EntityProps,
  DomainModelT extends Entity<DomainModelProps>,
  DatabaseModelT extends Model
> implements
    PersisterCreator<DomainModelT>,
    PersisterUpdater,
    PersisterDeleter,
    PersisterGetter<DomainModelT>,
    PersisterObserver<DomainModelT>,
    PersisterGetCollection<DomainModelT>,
    PersisterCollectionObserver<DomainModelT> {
  collection: Collection<DatabaseModelT>
  database: Database
  domainProps: string[]

  constructor(tableName: string, database: Database, domainProps: string[]) {
    if (database) {
      this.collection = database.collections.get<DatabaseModelT>(tableName)
      this.database = database
    }

    this.domainProps = domainProps
  }

  dbModelToDomainModel(dbModel: DatabaseModelT): DomainModelT {
    const domainModelProps: DomainModelProps = {} as DomainModelProps

    for (const prop of this.domainProps) {
      if ((dbModel as any)[prop] !== undefined) {
        ;(domainModelProps as any)[prop] = (dbModel as any)[prop]
      }
    }

    return new Entity<DomainModelProps>(domainModelProps) as DomainModelT
  }

  async create(domainModel: DomainModelT): Promise<void> {
    await this.database.action(async () => {
      const newTask = await this.collection.create((dbModel) => {
        dbModel.id = domainModel.id.toString()

        for (const key of Object.keys(domainModel.props)) {
          if ((dbModel as any)[key]) {
            ;(dbModel as any)[key] = (domainModel as any)[key]
          }
        }
      })

      if (!newTask) {
        return Promise.reject(new Error('Item cannot be created'))
      }

      return Promise.resolve()
    })
  }

  async update(props: Partial<EntityProps>, id: UniqueEntityID): Promise<void> {
    await this.database.action(async () => {
      const modelUpdate = await this.collection.find(id.toString())

      await modelUpdate.update((dbModel) => {
        for (const key of Object.keys(props)) {
          if ((dbModel as any)[key]) {
            ;(dbModel as any)[key] = (props as any)[key]
          }
        }
      })
    })
  }

  async delete(id: UniqueEntityID): Promise<void> {
    await this.database.action(async () => {
      const modelUpdate = await this.collection.find(id.toString())
      await modelUpdate.markAsDeleted()
    })
  }

  async get(id: UniqueEntityID): Promise<DomainModelT> {
    const modelGet = await this.collection.find(id.toString())
    return this.dbModelToDomainModel(modelGet)
  }

  async getCollection(): Promise<DomainModelT[]> {
    const collection = await this.collection.query().fetch()
    return collection.map(this.dbModelToDomainModel)
  }

  observe(id: UniqueEntityID): Observable<DomainModelT> {
    const modelObserve = this.collection.findAndObserve(id.toString())
    return modelObserve.pipe(
      map((dbModel) => this.dbModelToDomainModel(dbModel))
    )
  }

  observeCollection(): Observable<DomainModelT[]> {
    const collectionObserve = this.collection.query().observe()
    return collectionObserve.pipe(
      map((dbCollection) => dbCollection.map(this.dbModelToDomainModel))
    )
  }
}
