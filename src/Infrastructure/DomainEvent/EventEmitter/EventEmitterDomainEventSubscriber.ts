import { container } from 'tsyringe';
import DomainEvent from 'Domain/shared/DomainEvent/DomainEvent';
import { IDomainEventSubscriber } from 'Application/shared/DomainEvent/IDomainEventSubscriber';
import EventEmitterClient from './EventEmitterClient';

/* eslint-disable class-methods-use-this */
export default class EventEmitterDomainEventSubscriber
  implements IDomainEventSubscriber
{
  public subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void,
  ) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.once(eventName, callback);
  }
}
/* eslint-enable class-methods-use-this */
