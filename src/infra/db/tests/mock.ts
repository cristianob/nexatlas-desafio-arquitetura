import { UniqueEntityID } from '@/core/domain'
import { EntityProps } from '@/core/domain/Entity'
import {
  IDatabaseModelCreate,
  IDatabaseModelUpdate
} from '../protocols/DatabaseModel'

export class DatabaseModelCreateSpy<T> implements IDatabaseModelCreate<T> {
  public model: T

  async create(model: T): Promise<void> {
    this.model = model
    return Promise.resolve()
  }
}

export class DatabaseModelUpdateSpy implements IDatabaseModelUpdate {
  public props: EntityProps
  public id: UniqueEntityID

  async update(props: EntityProps, id: UniqueEntityID): Promise<void> {
    this.props = props
    this.id = id
    return Promise.resolve()
  }
}
