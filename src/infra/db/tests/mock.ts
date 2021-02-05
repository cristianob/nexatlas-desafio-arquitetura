import { IDatabaseModelCreate } from '../protocols/DatabaseModel'

export class DatabaseModelCreateSpy<T> implements IDatabaseModelCreate<T> {
  public model: T

  async create(model: T): Promise<void> {
    this.model = model
    return Promise.resolve()
  }
}
