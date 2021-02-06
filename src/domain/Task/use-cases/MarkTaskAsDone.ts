import { UniqueEntityID, UseCase } from '@/core/domain'
import { PersisterUpdater } from '@/domain/protocols/ModelPersister'

export class MarkTasAsDoneUseCase implements UseCase<UniqueEntityID, void> {
  constructor(private readonly updater: PersisterUpdater) {}

  async execute(id: UniqueEntityID): Promise<void> {
    return this.updater.update({ done: true }, id)
  }
}
