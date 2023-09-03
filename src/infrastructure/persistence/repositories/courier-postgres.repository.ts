import { MoreThanOrEqual, Repository } from 'typeorm'
import { dataSource } from '../orm'
import { Courier } from '../../../domain/models/courier'
import { CourierRepository } from '../../../domain/repositories/courier.repository'
import { CourierEntity } from '../entities/courier.entity'

export class CourierPostgresRepository implements CourierRepository {
  private readonly repository: Repository<Courier>

  constructor (repository: Repository<Courier>) {
    this.repository = repository
  }

  async findWithEqualsOrGreaterCapacity (minCapacity: number): Promise<Courier[]> {
    return await this.repository.findBy({ maxCapacity: MoreThanOrEqual(minCapacity) })
  }

  async save (courier: Courier): Promise<Courier> {
    return await this.repository.save(courier)
  }
}

export class CourierPostgresRepositoryFactory {
  static create (): CourierPostgresRepository {
    const typeOrmRepository = dataSource.getRepository<Courier>(CourierEntity)
    return new CourierPostgresRepository(typeOrmRepository)
  }
}
