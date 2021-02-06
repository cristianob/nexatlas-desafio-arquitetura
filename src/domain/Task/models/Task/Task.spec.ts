import * as Faker from 'faker'
import { Task } from '.'

describe('Task fields', () => {
  it('should create task if correct', () => {
    expect(() => {
      Task.create({
        desc: Faker.lorem.words(5),
        dueDate: new Date(),
        done: false
      })
    }).not.toThrow()
  })

  it('should throw error in task description if is too big', () => {
    expect(() => {
      Task.create({
        desc: Faker.lorem.words(5000),
        dueDate: new Date(),
        done: false
      })
    }).toThrow()
  })
})
