import { ValueObject } from '@/core/domain'
import { Result } from '@/core/logic'

interface TaskDescriptionProps {
  value: string
}

export class TaskDescription extends ValueObject<TaskDescriptionProps> {
  public static validate(description: string): Result<void> {
    if (description.length >= 200) {
      return Result.fail<void>('Description cannot be more than 200 characters')
    }

    return Result.ok()
  }

  public static create(description: string): TaskDescription {
    const validate = TaskDescription.validate(description)

    if (validate.isFailure) {
      throw new Error(validate.error)
    }

    return new TaskDescription({
      value: description
    })
  }
}
