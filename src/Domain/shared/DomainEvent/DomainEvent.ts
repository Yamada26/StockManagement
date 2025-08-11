import { nanoid } from 'nanoid';

export default class DomainEvent<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  public readonly eventId: string;

  // イベントの内容
  public readonly eventBody: T;

  // イベントの名前
  public readonly eventName: string;

  // イベントの発生時刻
  public readonly occurredOn: Date;

  private constructor(
    eventId: string,
    eventBody: T,
    eventName: string,
    occurredOn: Date,
  ) {
    this.eventId = eventId;
    this.eventBody = eventBody;
    this.eventName = eventName;
    this.occurredOn = occurredOn;
  }

  public static create<
    U extends Record<string, unknown> = Record<string, unknown>,
  >(eventBody: U, eventName: string): DomainEvent<U> {
    return new DomainEvent(nanoid(), eventBody, eventName, new Date());
  }

  public static reconstruct<U extends Record<string, unknown>>(
    eventId: string,
    eventBody: U,
    eventName: string,
    occurredOn: Date,
  ): DomainEvent<U> {
    return new DomainEvent(eventId, eventBody, eventName, occurredOn);
  }
}
