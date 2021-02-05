import { Entity } from '@/core/domain'

interface TaskTimeProps {
  startTime: Date
  endTime: Date
}

export class TaskTime extends Entity<TaskTimeProps> {
  public static create(props: TaskTimeProps): TaskTime {
    if (props.startTime > props.endTime) {
      throw new Error('endTime must be greater than startTime')
    }

    return new TaskTime(props)
  }
}
