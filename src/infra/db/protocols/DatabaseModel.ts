import { Observable } from 'rxjs'

export interface IDatabaseModelCreate<T> {
  create(model: T): Promise<void>
}

export interface IDatabaseModelUpdate<T> {
  update(model: T): Promise<void>
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
