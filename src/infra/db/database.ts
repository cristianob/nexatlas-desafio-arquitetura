import { Database, appSchema } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { TaskDBModel, TaskSchema } from './models/Task'

const schema = appSchema({
  version: 1,
  tables: [TaskSchema]
})

const adapter = new SQLiteAdapter({
  schema
})

export const database = new Database({
  adapter,
  modelClasses: [TaskDBModel],
  actionsEnabled: true
})
