import {
  FindOptionsWhere,
  FindManyOptions,
  FindOneOptions,
  Repository,
  createConnection,
  getConnection,
  QueryFailedError,
} from "typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
// import { QueryFailedError } from "typeorm/query-builder";
// import { v4 as uuid } from "uuid";

import { BaseEntity, IBaseEntity } from "../data-models/base";
import { PostgresErrorCode } from "./pgErrorCodes";

export class PostgresError extends Error {
  public readonly code: PostgresErrorCode;

  constructor(message: string, public readonly queryError: QueryFailedError) {
    super(message);
    this.code = (queryError as unknown as { code: PostgresErrorCode }).code;
  }
}

const getEnv = (variable: string, defaultValue?: string) => {
  const processEnv = process.env[variable];
  return processEnv || defaultValue;
};

// const host = getEnv("PGHOST");
// const user = getEnv("PGUSER", "postgres");
// const password = getEnv("PGPASSWORD", "asdf1234");
// const port = Number(getEnv("PGPORT"));
const database: string = getEnv("PGDATABASE", "taxi-db")!;

/**
 * The generic type arguments for BaseRepository seem a little convoluted,
 * but there's a strategy in mind. TypeORM uses classes and class decorators
 * to set up establish ORM models and model relations.
 *
 * By only accepting and producing the interface version of models, we can keep
 * the class models from propagating throughout the app and allows repositories
 * to run on pure data structures
 */
export abstract class BaseRepository<
  // Properties in an existing record
  Props extends IBaseEntity,
  // Class representing TypeORM model
  Class extends BaseEntity & Props,
  // Properties required to create this record
  CreateProps
> {
  constructor(private readonly classFn: new () => Class) {}

  public findOne(options: FindOneOptions<Class>): Promise<Props | null> {
    return this.execute((repo) => repo.findOne(options));
  }

  public find(options: FindManyOptions<Class>): Promise<Props[]> {
    return this.execute((repo) => repo.find(options));
  }

  public create(model: CreateProps): Promise<Props> {
    // TODO: fix any cast
    return this.execute((repo) => repo.save(model as any));
  }

  public update(
    id: string | number,
    update: Partial<Props>
  ): Promise<UpdateResult> {
    // TODO: fix any cast
    return this.execute((repo) => repo.update(id, update as any));
  }

  public async delete(options: FindOptionsWhere<Class>): Promise<void> {
    await this.execute((repo) => repo.delete(options));
  }

  private async execute<P>(fn: (repo: Repository<Class>) => Promise<P>) {
    try {
      const repo = await this.getRepository();
      return await fn(repo);
      // TODO: fix any cast
    } catch (err: any) {
      throw new PostgresError(err.message, err);
    }
  }

  private async getRepository(): Promise<Repository<Class>> {
    try {
      const connection = getConnection(database);
      return connection.getRepository<Class>(this.classFn);
    } catch (error) {
      const connection = await createConnection(database);
      return connection.getRepository<Class>(this.classFn);
    }
  }
}
