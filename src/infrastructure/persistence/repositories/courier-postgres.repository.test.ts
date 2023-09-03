import { Repository, EntityManager } from 'typeorm'
import { CourierPostgresRepository, CourierPostgresRepositoryFactory } from './courier-postgres.repository'
import { Courier } from '../../../domain/models/courier'

describe('CourierPostgresRepository', () => {
  let repository: Repository<Courier>
  let courierPostgresRepository: CourierPostgresRepository
  let entityManager: EntityManager

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      save: jest.fn()
    } as unknown as Repository<Courier>

    entityManager = {
      transaction: async (callback) => {
        return callback(entityManager)
      },
      getRepository: jest.fn().mockReturnValue(repository)
    } as unknown as EntityManager

    courierPostgresRepository = new CourierPostgresRepository(repository, entityManager)
  })

  it('should find couriers with equal or greater capacity', async () => {
    const minCapacity = 100
    const expectedCouriers: Courier[] = [
      new Courier(1, minCapacity),
      new Courier(1, minCapacity + 20),
      new Courier(1, minCapacity + 40)
    ]

    repository.findBy = jest.fn().mockResolvedValue(expectedCouriers)

    const result = await courierPostgresRepository.findWithEqualsOrGreaterCapacity(minCapacity)

    expect(result).toEqual(expectedCouriers)
    expect(repository.findBy).toHaveBeenCalledWith({
      maxCapacity: expect.objectContaining({
        _type: 'moreThanOrEqual',
        _value: expect.any(Number)
      })
    })
  })

  it('should save a courier with a transaction', async () => {
    const courier: Courier = new Courier(1, 10)
    repository.save = jest.fn().mockResolvedValue(courier)
    courierPostgresRepository = new CourierPostgresRepository(repository, entityManager)

    const result = await courierPostgresRepository.save(courier)

    expect(result).toEqual(courier)
  })
})

describe('CourierPostgresRepositoryFactory', () => {
  it('should create a CourierPostgresRepository instance', () => {
    const courierPostgresRepository = CourierPostgresRepositoryFactory.create()

    expect(courierPostgresRepository).toBeInstanceOf(CourierPostgresRepository)
  })
})
