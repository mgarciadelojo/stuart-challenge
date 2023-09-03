import { Courier } from '../domain/models/courier'
import { CourierRepository } from '../domain/repositories/courier.repository'

export class SyncCourierUsecase {
  constructor (private readonly courierRepository: CourierRepository) {}

  async execute (courierId: number, maxCapacity: number): Promise<Courier> {
    if (courierId <= 0) {
      throw new Error('Courier id must be greater than 0')
    }

    if (maxCapacity <= 0) {
      throw new Error('Max capacity must be greater than 0')
    }

    const courier = new Courier(courierId, maxCapacity)
    return await this.courierRepository.save(courier)
  }
}
