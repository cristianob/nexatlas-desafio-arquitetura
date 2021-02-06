import { UniqueEntityID } from './UniqueEntityID'

export interface EntityProps {
  [key: string]: any
}

export abstract class Entity<T extends EntityProps> {
  protected readonly _id: UniqueEntityID
  public readonly props: T

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
