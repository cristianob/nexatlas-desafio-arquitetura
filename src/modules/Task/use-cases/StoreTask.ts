import { UseCase } from '@/core/domain'
import { IDatabaseModelCreate } from '@/infra/db/protocols/DatabaseModel'
import { Task } from '../models'

export class StoreTaskUseCase implements UseCase<Task, void> {
  constructor(private readonly creator: IDatabaseModelCreate<Task>) {}

  async execute(model: Task): Promise<void> {
    if (model.props.dueDate < new Date(new Date().getTime() - 3600)) {
      return Promise.reject(new Error('Are you a time traveler?'))
    }

    return this.creator.create(model)
  }
}
