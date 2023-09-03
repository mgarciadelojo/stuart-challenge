import { CourierRepository } from '../domain/repositories/courier.repository'
import { Courier } from '../domain/models/courier'

export class LookupCouriersUsecase {
  private readonly courierRepository: CourierRepository

  constructor (courierRepository: CourierRepository) {
    this.courierRepository = courierRepository
  }

  async execute (capacityRequired: number): Promise<Courier[]> {
    if (capacityRequired <= 0) {
      throw new Error('Capacity required must be greater than 0')
    }

    return await this.courierRepository.findWithEqualsOrGreaterCapacity(capacityRequired)
  }
}
