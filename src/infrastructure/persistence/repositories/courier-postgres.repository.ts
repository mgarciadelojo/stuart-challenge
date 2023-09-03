import { EntityManager, MoreThanOrEqual, Repository } from 'typeorm'
import { dataSource } from '../orm'
import { Courier } from '../../../domain/models/courier'
import { CourierRepository } from '../../../domain/repositories/courier.repository'
import { CourierEntity } from '../entities/courier.entity'

export class CourierPostgresRepository implements CourierRepository {
  private readonly repository: Repository<Courier>
  private readonly entityManager: EntityManager

  constructor (repository: Repository<Courier>, entityManager: EntityManager) {
    this.repository = repository
    this.entityManager = entityManager
  }

  async findWithEqualsOrGreaterCapacity (minCapacity: number): Promise<Courier[]> {
    return await this.repository.findBy({ maxCapacity: MoreThanOrEqual(minCapacity) })
  }

  async save (courier: Courier): Promise<Courier> {
    // Transactions have their own scope of execution: they have their own query runner, entity
    // manager and repository instances. That's why using global (data source's) entity manager
    // and repositories won't work in transactions. In order to execute queries properly in
    // scope of transaction you must use the provided entity manager and its getRepository method.
    return await this.entityManager.transaction(async transactionalEntityManager => {
      const courierRepository = transactionalEntityManager.getRepository<Courier>(CourierEntity)
      return await courierRepository.save(courier)
    })
  }
}

export class CourierPostgresRepositoryFactory {
  static create (): CourierPostgresRepository {
    const typeOrmRepository = dataSource.getRepository<Courier>(CourierEntity)
    return new CourierPostgresRepository(typeOrmRepository, dataSource.manager)
  }
}
