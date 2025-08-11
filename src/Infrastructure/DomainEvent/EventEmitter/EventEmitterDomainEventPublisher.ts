import { container } from 'tsyringe';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';
import DomainEvent from 'Domain/shared/DomainEvent/DomainEvent';
import EventEmitterClient from './EventEmitterClient';

/* eslint-disable class-methods-use-this */
export default class EventEmitterDomainEventPublisher
  implements IDomainEventPublisher
{
  public publish(domainEvent: DomainEvent) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.emit(domainEvent.eventName, domainEvent);
  }
}
/* eslint-enable class-methods-use-this */
