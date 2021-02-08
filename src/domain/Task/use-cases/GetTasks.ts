import { Observable } from 'rxjs'
import { inject, singleton } from 'tsyringe'
import { UseCase } from '@/core/domain'
import { PersisterCollectionObserver } from '@/domain/protocols/ModelPersister'
import { Task } from '../models'

@singleton()
export class GetTasksUseCase implements UseCase<void, Observable<Task[]>> {
  constructor(
    // TODO: Fix this, don't use MAGIC STRINGS
    @inject('TaskPersisterCollectionObserver')
    protected readonly observer?: PersisterCollectionObserver<Task>
  ) {}

  execute(): Observable<Task[]> {
    return this.observer.observeCollection()
  }
}
