import { SyncCourierUsecase } from './sync-courier.usecase'
import { CourierRepository } from '../domain/repositories/courier.repository'
import { Courier } from '../domain/models/courier'

// Mock the CourierRepository or use a testing database
const mockCourierRepository: CourierRepository = {
  findWithEqualsOrGreaterCapacity: async (minCapacity: number) => {
    return []
  },
  save: async (courier) => {
    return courier
  }
}

describe('SyncCourierUsecase', () => {
  it('should save a courier and return it', async () => {
    const usecase = new SyncCourierUsecase(mockCourierRepository)
    const result = await usecase.execute(1, 10)
    expect(result).toEqual(new Courier(1, 10))
  })
})
