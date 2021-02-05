import { Entity } from '@/core/domain'
import { TaskDescription } from './TaskFields'

interface TaskProps {
  desc: TaskDescription
  dueDate: Date
  done: boolean
}

export class Task extends Entity<TaskProps> {
  public static create(props: TaskProps): Task {
    // Aqui poderiam ter validações da Entidade

    return new Task(props)
  }
}
