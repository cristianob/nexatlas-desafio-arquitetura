import * as faker from 'faker'
import { DatabaseModelUpdateSpy } from '@/infra/db/tests/mock'
import { MarkTasAsDoneUseCase } from './MarkTaskAsDone'
import { UniqueEntityID } from '@/core/domain'

const makeSUT = () => {
  const spy = new DatabaseModelUpdateSpy()
  const sut = new MarkTasAsDoneUseCase(spy)

  return { sut, spy }
}

describe('MarkTaskAsDone use case', () => {
  it('should update the model setting done to true', () => {
    const { sut, spy } = makeSUT()

    const id = new UniqueEntityID(faker.random.uuid())
    sut.execute(id)

    expect(spy.id).toBe(id)
    expect(spy.props).toHaveProperty('done')
    expect(spy.props.done).toBe(true)
  })
})
