import { Task } from '@/domain/Task/models'
import { TaskProps } from '@/domain/Task/models/Task'
import { TaskPropsArray } from '@/domain/Task/models/Task/Task'
import { database } from '../database'
import { TaskDBModel } from '../models/Task'
import { DatabaseGenericPersisterAdapter } from './DatabaseGenericPersisterAdapter'

export class TaskPersisterAdapter extends DatabaseGenericPersisterAdapter<
  TaskProps,
  Task,
  TaskDBModel
> {
  constructor() {
    super('tasks', database, TaskPropsArray)
  }
}
