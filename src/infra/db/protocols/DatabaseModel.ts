import { UniqueEntityID } from '@/core/domain'
import { EntityProps } from '@/core/domain/Entity'
import { Observable } from 'rxjs'

export interface IDatabaseModelCreate<T> {
  create(model: T): Promise<void>
}

export interface IDatabaseModelUpdate {
  update(model: EntityProps, id: UniqueEntityID): Promise<void>
}

export interface IDatabaseModelDelete {
  delete(id: any): Promise<void>
}

export interface IDatabaseModelGet<T> {
  get(id: any): Promise<T>
}

export interface IDatabaseModelObserve<T> {
  observe(id: any): Observable<T>
}

export interface IDatabaseModelGetCollection<T> {
  getCollection(): Promise<T[]>
}

export interface IDatabaseModelCollectionObserve<T> {
  observeCollection(): Observable<T[]>
}
