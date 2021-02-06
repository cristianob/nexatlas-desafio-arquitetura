import { Observable } from 'rxjs'
import { UseCase } from '@/core/domain'
import { PersisterCollectionObserver } from '@/domain/protocols/ModelPersister'
import { Task } from '../models'

export class GetTasksUseCase implements UseCase<void, Observable<Task[]>> {
  constructor(private readonly observer: PersisterCollectionObserver<Task>) {}

  execute(): Observable<Task[]> {
    return this.observer.observeCollection()
  }
}
