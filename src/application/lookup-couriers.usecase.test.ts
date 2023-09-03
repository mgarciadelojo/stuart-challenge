import { LookupCouriersUsecase } from './lookup-couriers.usecase'
import { CourierRepository } from '../domain/repositories/courier.repository'
import { Courier } from '../domain/models/courier'

const mockCourierRepository: CourierRepository = {
  findWithEqualsOrGreaterCapacity: async (minCapacity: number) => {
    return []
  },
  save: async (courier) => {
    return courier
  }
}

describe('LookupCouriersUsecase', () => {
  it('should return an empty array of couriers if no couriers found', async () => {
    const usecase = new LookupCouriersUsecase(mockCourierRepository)
    const result = await usecase.execute(100)
    expect(result).toEqual([])
  })

  it('should return an array of couriers', async () => {
    mockCourierRepository.findWithEqualsOrGreaterCapacity = async (minCapacity: number) => {
      return [
        new Courier(1, minCapacity),
        new Courier(1, minCapacity + 20),
        new Courier(1, minCapacity + 40)
      ]
    }

    const usecase = new LookupCouriersUsecase(mockCourierRepository)
    const result = await usecase.execute(100)
    expect(result).toEqual([
      new Courier(1, 100),
      new Courier(1, 120),
      new Courier(1, 140)
    ])
  })
})
