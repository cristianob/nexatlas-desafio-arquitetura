import { Observable, queueScheduler, scheduled } from 'rxjs'
import * as Faker from 'faker'
import { IDatabaseModelCollectionObserve } from '@/infra/db/protocols/DatabaseModel'
import { GetTasksUseCase } from './GetTasks'
import { Task } from '../models'
import { TaskDescription } from '../models/Task/TaskFields'

class TaskModelCollectionObserveSpy
  implements IDatabaseModelCollectionObserve<Task> {
  public task1: Task
  public task2: Task

  observeCollection(): Observable<Task[]> {
    this.task1 = Task.create({
      desc: TaskDescription.create(Faker.lorem.words(5)),
      dueDate: new Date(),
      done: false
    })

    this.task2 = Task.create({
      desc: TaskDescription.create(Faker.lorem.words(5)),
      dueDate: new Date(),
      done: false
    })

    return scheduled<Task[]>(
      [
        [this.task1, this.task2],
        [this.task2, this.task1]
      ],
      queueScheduler
    )
  }
}

const makeSUT = () => {
  const spy = new TaskModelCollectionObserveSpy()
  const sut = new GetTasksUseCase(spy)

  return { sut, spy }
}

describe('MarkTaskAsDone use case', () => {
  it('should receive an observable when executed', async () => {
    const { sut, spy } = makeSUT()

    const observable = sut.execute()

    expect(observable).toBeInstanceOf(Observable)

    observable.subscribe((value) => {
      expect(value).toContain(spy.task1)
      expect(value).toContain(spy.task2)
    })

    await observable.toPromise()
  })
})
