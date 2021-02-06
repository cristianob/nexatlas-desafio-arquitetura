import * as Faker from 'faker'
import { Entity, UniqueEntityID } from '@/core/domain'
import { Model } from '@nozbe/watermelondb'
import { DatabaseGenericPersisterAdapter } from './DatabaseGenericPersisterAdapter'

interface EntitySpyProps {
  test1: string
  test2: number
  test3: boolean
  test4: Date
}

const EntitySpyPropsArray = ['test1', 'test2', 'test3', 'test4']

class EntitySpy extends Entity<EntitySpyProps> {
  public static create(props: EntitySpyProps, id?: UniqueEntityID): EntitySpy {
    return new EntitySpy(props, id)
  }

  get banana(): string {
    return 'bananahey'
  }

  get test1(): string {
    return this.props.test1
  }

  set test1(test1: string) {
    this.props.test1 = test1
  }

  get test2(): number {
    return this.props.test2
  }

  set test2(test2: number) {
    this.props.test2 = test2
  }

  get test3(): boolean {
    return this.props.test3
  }

  set test3(test3: boolean) {
    this.props.test3 = test3
  }

  get test4(): Date {
    return this.props.test4
  }

  set test4(test4: Date) {
    this.props.test4 = test4
  }
}

class DbModelSpy extends Model {
  static table = 'test'

  test1: string
  test2: number
  test3: boolean
  test4: Date
}

class TestPersistAdapter extends DatabaseGenericPersisterAdapter<
  EntitySpyProps,
  EntitySpy,
  DbModelSpy
> {
  constructor() {
    super('test', null, EntitySpyPropsArray)
  }
}

const makeSUT = () => {
  const sut = new TestPersistAdapter()
  return { sut }
}

describe('DatabaseGenericPersister adapter', () => {
  it('should convert dbModel to domainModel', () => {
    const { sut } = makeSUT()

    const dbModelTest = new DbModelSpy()
    dbModelTest.test1 = Faker.lorem.words(5)
    dbModelTest.test2 = Faker.random.number(1000)
    dbModelTest.test3 = Faker.random.boolean()
    dbModelTest.test4 = new Date()

    const entity = sut.dbModelToDomainModel(dbModelTest)
    expect(entity.props.test1).toBe(dbModelTest.test1)
    expect(entity.props.test2).toBe(dbModelTest.test2)
    expect(entity.props.test3).toBe(dbModelTest.test3)
    expect(entity.props.test4).toBe(dbModelTest.test4)
    expect(Object.keys(entity.props).length).toBe(4)
  })
})
