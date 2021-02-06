import { UniqueEntityID } from '@/core/domain'
import { EntityProps } from '@/core/domain/Entity'
import { Observable } from 'rxjs'

export interface PersisterCreator<T> {
  create(model: T): Promise<void>
}

export interface PersisterUpdater {
  update(model: EntityProps, id: UniqueEntityID): Promise<void>
}

export interface PersisterDeleter {
  delete(id: any): Promise<void>
}

export interface PersisterGetter<T> {
  get(id: any): Promise<T>
}

export interface PersisterObserver<T> {
  observe(id: any): Observable<T>
}

export interface PersisterGetCollection<T> {
  getCollection(): Promise<T[]>
}

export interface PersisterCollectionObserver<T> {
  observeCollection(): Observable<T[]>
}
