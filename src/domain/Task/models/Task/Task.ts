import { Entity, UniqueEntityID } from '@/core/domain'
export interface TaskProps {
  desc: string
  dueDate: Date
  done: boolean
}

export const TaskPropsArray = ['desc', 'dueDate', 'done']

export class Task extends Entity<TaskProps> {
  public static create(props: TaskProps, id?: UniqueEntityID): Task {
    if (props.desc.length > 200) {
      throw new Error('Desc length needs to be less than 200')
    }

    return new Task(props, id)
  }

  get desc() {
    return this.props.desc
  }

  set desc(desc: string) {
    if (desc.length > 200) {
      throw new Error('Desc length needs to be less than 200')
    }

    this.props.desc = desc
  }

  get dueDate() {
    return this.props.dueDate
  }

  set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate
  }

  get done() {
    return this.props.done
  }

  set done(done: boolean) {
    this.props.done = done
  }

  setTaskDone() {
    this.props.done = true
  }
}
