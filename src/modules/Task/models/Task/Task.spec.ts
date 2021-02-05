import * as Faker from 'faker'
import { TaskDescription } from './TaskFields'
import { Task } from '.'

describe('Task fields', () => {
  it('should create task if correct', () => {
    expect(() => {
      Task.create({
        desc: TaskDescription.create(Faker.lorem.words(5)),
        dueDate: new Date(),
        done: false
      })
    }).not.toThrow()
  })
})
