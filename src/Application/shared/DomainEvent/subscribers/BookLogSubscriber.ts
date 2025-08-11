import { inject, injectable } from 'tsyringe';
import {
  BOOK_EVENT_NAME,
  BookDomainEventBody,
} from 'Domain/shared/DomainEvent/Book/BookDomainEventFactory';
import { IDomainEventSubscriber } from '../IDomainEventSubscriber';

@injectable()
export default class BookLogSubscriber {
  public constructor(
    @inject('IDomainEventSubscriber')
    private subscriber: IDomainEventSubscriber,
  ) {
    this.subscriber.subscribe<BookDomainEventBody>(
      BOOK_EVENT_NAME.CREATED,
      (event) => {
        console.log(event);
      },
    );
  }
}
