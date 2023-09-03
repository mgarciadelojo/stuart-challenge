export class Courier {
  private readonly id: number
  private readonly maxCapacity: number

  constructor (id: number, maxCapacity: number) {
    if (maxCapacity <= 0) {
      throw new Error('Max capacity must be greater than 0')
    }

    this.id = id
    this.maxCapacity = maxCapacity
  }
}
