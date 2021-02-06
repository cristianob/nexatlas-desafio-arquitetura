import { TaskTime } from '.'

describe('Task fields', () => {
  it('should create TaskTime if correct', () => {
    expect(() => {
      TaskTime.create({
        startTime: new Date(new Date().getTime() - 3000),
        endTime: new Date()
      })
    }).not.toThrow()
  })

  it('should throw error in TaskTime if startTime is greater than endTime', () => {
    expect(() => {
      TaskTime.create({
        startTime: new Date(),
        endTime: new Date(new Date().getTime() - 3000)
      })
    }).toThrow()
  })
})
