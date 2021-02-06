import { Entity } from '@/core/domain'

export interface TaskTimeProps {
  startTime: Date
  endTime: Date
}

export const TaskTimePropsArray = ['startTime', 'endTime']

export class TaskTime extends Entity<TaskTimeProps> {
  public static create(props: TaskTimeProps): TaskTime {
    if (props.startTime > props.endTime) {
      throw new Error('endTime must be greater than startTime')
    }

    return new TaskTime(props)
  }

  get startTime() {
    return this.props.startTime
  }

  set startTime(startTime: Date) {
    if (this.props.endTime && this.props.endTime < startTime) {
      throw new Error('endTime must be greater than startTime')
    }

    this.props.startTime = startTime
  }

  get endTime() {
    return this.props.endTime
  }

  set endTime(endTime: Date) {
    if (this.props.startTime && this.props.startTime > endTime) {
      throw new Error('endTime must be greater than startTime')
    }

    this.props.endTime = endTime
  }
}
