import { UniqueEntityID } from './UniqueEntityID'

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export interface EntityProps {
  [key: string]: any
}

export abstract class Entity<T extends EntityProps> {
  protected readonly id: UniqueEntityID
  public readonly props: T

  protected constructor(props: T, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID()
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this.id.equals(object.id)
  }
}
