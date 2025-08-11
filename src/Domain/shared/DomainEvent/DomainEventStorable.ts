import DomainEvent from './DomainEvent';

export default abstract class DomainEventStorable {
  private domainEvents: DomainEvent[] = [];

  protected addDomainEvent(domainEvent: DomainEvent) {
    this.domainEvents.push(domainEvent);
  }

  public getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  public clearDomainEvents() {
    this.domainEvents = [];
  }
}
