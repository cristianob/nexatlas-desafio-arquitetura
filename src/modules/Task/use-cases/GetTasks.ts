import { UseCase } from '@/core/domain'
import { IDatabaseModelCollectionObserve } from '@/infra/db/protocols/DatabaseModel'
import { Observable } from 'rxjs'
import { Task } from '../models'

export class GetTasksUseCase implements UseCase<void, Observable<Task[]>> {
  constructor(
    private readonly observer: IDatabaseModelCollectionObserve<Task>
  ) {}

  execute(): Observable<Task[]> {
    return this.observer.observeCollection()
  }
}
