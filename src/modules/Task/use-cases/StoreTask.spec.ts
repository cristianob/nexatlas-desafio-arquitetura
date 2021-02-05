import * as Faker from 'faker'
import { DatabaseModelCreateSpy } from '@/infra/db/tests/mock'
import { Task } from '../models'
import { TaskDescription } from '../models/Task/TaskFields'
import { StoreTaskUseCase } from './StoreTask'

const makeSUT = () => {
  const spy = new DatabaseModelCreateSpy<Task>()
  const sut = new StoreTaskUseCase(spy)

  return { sut, spy }
}

describe('StoreTask use case', () => {
  it('should exececute if task is valid', async () => {
    const { sut, spy } = makeSUT()

    const task = Task.create({
      desc: TaskDescription.create(Faker.lorem.words(5)),
      dueDate: new Date(),
      done: false
    })

    await sut.execute(task)
    expect(spy.model).toBe(task)
  })

  it('shoud reject if dueDate is in the past', async () => {
    const { sut } = makeSUT()

    const task = Task.create({
      desc: TaskDescription.create(Faker.lorem.words(5)),
      dueDate: new Date('1990-01-01'),
      done: false
    })

    try {
      await sut.execute(task)
    } catch (e) {
      expect(e).toBeTruthy()
      return
    }

    fail('Code not rejected')
  })
})
