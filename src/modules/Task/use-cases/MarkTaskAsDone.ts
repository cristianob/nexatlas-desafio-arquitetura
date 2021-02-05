import { UniqueEntityID, UseCase } from '@/core/domain'
import { IDatabaseModelUpdate } from '@/infra/db/protocols/DatabaseModel'

export class MarkTasAsDoneUseCase implements UseCase<UniqueEntityID, void> {
  constructor(private readonly updater: IDatabaseModelUpdate) {}

  async execute(id: UniqueEntityID): Promise<void> {
    return this.updater.update({ done: true }, id)
  }
}
