interface Repository<T> {
  create(entity: T): Promise<T | undefined>;
  update(entity: T): Promise<T | undefined>;
  delete(entity:T): Promise<void>;
}