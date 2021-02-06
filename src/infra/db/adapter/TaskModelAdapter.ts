import { UniqueEntityID } from '@/core/domain'
import { EntityProps } from '@/core/domain/Entity'
import { Task } from '@/domain/Task/models'
import { Observable } from 'rxjs'
import {
  PersisterCollectionObserver,
  PersisterCreator,
  PersisterUpdater
} from '../../../domain/protocols/ModelPersister'
import { database } from '../database'
import { TaskDBModel } from '../models/Task'

export class TaskDatabaseAdapter
  implements
    PersisterCreator<Task>,
    PersisterUpdater,
    PersisterCollectionObserver<Task> {
  collection = database.collections.get<TaskDBModel>('tasks')

  async create(model: Task): Promise<void> {
    await database.action(async () => {
      const newTask = await this.collection.create((taskDb) => {
        taskDb.desc = model.props.desc.props.value
        taskDb.dueDate = model.props.dueDate
        taskDb.done = model.props.done
      })

      if (!newTask) {
        return Promise.reject(new Error('Item cannot be created'))
      }

      return Promise.resolve()
    })
  }

  async update(model: EntityProps, id: UniqueEntityID): Promise<void> {
    await database.action(async () => {
      const postUpdate = await this.collection.find(id.toString())

      await postUpdate.update((post) => {
        post.title = 'Updated title'
      })
    })
  }

  observeCollection(): Observable<Task[]> {
    return this.collection.query().observe()
  }
}
