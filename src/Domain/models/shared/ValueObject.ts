import { isEqual } from 'lodash';

export default abstract class ValueObject<T, U> {
  // @ts-expect-error: Used to enforce generic type U for type safety, not for runtime use
  private _type: U;

  protected readonly _value: T;

  public constructor(value: T) {
    this._value = value;

    this.validate();
  }

  protected abstract validate(): void;

  public get value(): T {
    return this._value;
  }

  public equals(other: ValueObject<T, U>): boolean {
    return isEqual(this._value, other._value);
  }
}
