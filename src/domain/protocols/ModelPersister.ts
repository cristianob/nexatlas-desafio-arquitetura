import { UniqueEntityID } from '@/core/domain'
import { EntityProps } from '@/core/domain/Entity'
import { Observable } from 'rxjs'

export interface PersisterCreator<T> {
  create(model: T): Promise<void>
}

export interface PersisterUpdater {
  update(model: Partial<EntityProps>, id: UniqueEntityID): Promise<void>
}

export interface PersisterDeleter {
  delete(id: UniqueEntityID): Promise<void>
}

export interface PersisterGetter<T> {
  get(id: UniqueEntityID): Promise<T>
}

export interface PersisterObserver<T> {
  observe(id: UniqueEntityID): Observable<T>
}

export interface PersisterGetCollection<T> {
  getCollection(): Promise<T[]>
}

export interface PersisterCollectionObserver<T> {
  observeCollection(): Observable<T[]>
}
