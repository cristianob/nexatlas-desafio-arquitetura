import { UniqueEntityID } from './UniqueEntityID'

export interface EntityProps {
  [key: string]: any
}

export class Entity<T extends EntityProps> {
  protected readonly _id: UniqueEntityID
  public readonly props: T

  public constructor(props: T, id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
