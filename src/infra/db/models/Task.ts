import { tableSchema, Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'

export const TaskSchema = tableSchema({
  name: 'tasks',
  columns: [
    { name: 'desc', type: 'string' },
    { name: 'due_date_at', type: 'number' },
    { name: 'done', type: 'boolean', isIndexed: true }
  ]
})

export class TaskDBModel extends Model {
  static table = 'tasks'

  @field('desc') desc: string
  @date('due_date_at') dueDate: Date
  @field('done') done: boolean
}
