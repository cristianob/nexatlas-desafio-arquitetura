import * as Faker from 'faker'
import { TaskDescription } from './TaskFields'

describe('Task model fields', () => {
  it('should create task description if correct', () => {
    expect(() => {
      TaskDescription.create(Faker.random.words(5))
    }).not.toThrow()
  })

  it('should throw error in task description if is too big', () => {
    expect(() => {
      TaskDescription.create(Faker.random.words(500))
    }).toThrow()
  })
})
