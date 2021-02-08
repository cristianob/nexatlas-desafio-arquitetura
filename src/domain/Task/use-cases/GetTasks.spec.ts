import 'reflect-metadata'
import { Observable, queueScheduler, scheduled } from 'rxjs'
import * as Faker from 'faker'
import { container, injectable } from 'tsyringe'

import { PersisterCollectionObserver } from '@/domain/protocols/ModelPersister'
import { GetTasksUseCase } from './GetTasks'
import { Task } from '../models'

@injectable()
class TaskModelCollectionObserveSpy
  implements PersisterCollectionObserver<Task> {
  public task1: Task
  public task2: Task

  observeCollection(): Observable<Task[]> {
    this.task1 = Task.create({
      desc: Faker.lorem.words(5),
      dueDate: new Date(),
      done: false
    })

    this.task2 = Task.create({
      desc: Faker.lorem.words(5),
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

  const sut = container
    .createChildContainer()
    .register<PersisterCollectionObserver<Task>>(
      'TaskPersisterCollectionObserver',
      TaskModelCollectionObserveSpy
    )
    .resolve(GetTasksUseCase)

  return { sut, spy }
}

describe('MarkTaskAsDone use case', () => {
  beforeEach(() => {
    container.clearInstances()
  })

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
