import { Repository } from 'typeorm'
import { CourierPostgresRepository, CourierPostgresRepositoryFactory } from './courier-postgres.repository'
import { Courier } from '../../../domain/models/courier'

describe('CourierPostgresRepository', () => {
  let repository: Repository<Courier>
  let courierPostgresRepository: CourierPostgresRepository

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      save: jest.fn()
    } as unknown as Repository<Courier>

    courierPostgresRepository = new CourierPostgresRepository(repository)
  })

  it('should find couriers with equal or greater capacity', async () => {
    const minCapacity = 100
    const expectedCouriers: Courier[] = [
      new Courier(1, minCapacity),
      new Courier(1, minCapacity + 20),
      new Courier(1, minCapacity + 40)
    ]

    repository.find = jest.fn().mockResolvedValue(expectedCouriers)

    const result = await courierPostgresRepository.findWithEqualsOrGreaterCapacity(minCapacity)

    expect(result).toEqual(expectedCouriers)
    expect(repository.find).toHaveBeenCalledWith({ maxCapacity: expect.any(Number) })
  })

  it('should save a courier', async () => {
    const courier: Courier = new Courier(1, 10)
    repository.save = jest.fn().mockResolvedValue(courier)

    const result = await courierPostgresRepository.save(courier)

    expect(result).toEqual(courier)
    expect(repository.save).toHaveBeenCalledWith(courier)
  })
})

describe('CourierPostgresRepositoryFactory', () => {
  it('should create a CourierPostgresRepository instance', () => {
    const courierPostgresRepository = CourierPostgresRepositoryFactory.create()

    expect(courierPostgresRepository).toBeInstanceOf(CourierPostgresRepository)
  })
})
