import { injectable, inject } from 'tsyringe';
import Book from 'Domain/models/Book/Book';
import BookId from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import Price from 'Domain/models/Book/Price/Price';
import QuantityAvailable from 'Domain/models/Book/Stock/QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from 'Domain/models/Book/Stock/Status/Status';
import Stock from 'Domain/models/Book/Stock/Stock';
import StockId from 'Domain/models/Book/Stock/StockId/StockId';
import Title from 'Domain/models/Book/Title/Title';
import PrismaClientManager from 'Infrastructure/Prisma/PrismaClientManager';
import { IDomainEventPublisher } from 'Domain/shared/DomainEvent/IDomainEventPublisher';

import { Status as PrismaStatus } from '@prisma/client';

@injectable()
export default class PrismaBookRepository implements IBookRepository {
  private clientManager: PrismaClientManager;

  public constructor(
    @inject('IDataAccessClientManager') clientManager: PrismaClientManager,
  ) {
    this.clientManager = clientManager;
  }

  // DBのstatusの型とドメイン層のStatusの型が異なるので変換する
  private static statusDataMapper(
    status: StatusEnum,
  ): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' {
    switch (status) {
      case StatusEnum.InStock:
        return 'IN_STOCK';
      case StatusEnum.LowStock:
        return 'LOW_STOCK';
      case StatusEnum.OutOfStock:
        return 'OUT_OF_STOCK';
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  private static statusEnumMapper(status: PrismaStatus): Status {
    switch (status) {
      case 'IN_STOCK':
        return new Status(StatusEnum.InStock);
      case 'LOW_STOCK':
        return new Status(StatusEnum.LowStock);
      case 'OUT_OF_STOCK':
        return new Status(StatusEnum.OutOfStock);
      default:
        throw new Error(`Unknown status: ${status}`);
    }
  }

  public async save(book: Book, domainEventPublisher: IDomainEventPublisher) {
    const client = this.clientManager.getClient();

    await client.book.create({
      data: {
        id: book.id.value,
        title: book.title.value,
        priceAmount: book.price.value.amount,
        stock: {
          create: {
            id: book.stockId.value,
            quantityAvailable: book.quantityAvailable.value,
            status: PrismaBookRepository.statusDataMapper(book.status.value),
          },
        },
      },
    });

    // ここでイベントをパブリッシュする
    book.getDomainEvents().forEach((event) => {
      domainEventPublisher.publish(event);
    });
    book.clearDomainEvents();
  }

  public async update(book: Book, domainEventPublisher: IDomainEventPublisher) {
    const client = this.clientManager.getClient();

    await client.book.update({
      where: {
        id: book.id.value,
      },
      data: {
        title: book.title.value,
        priceAmount: book.price.value.amount,
        stock: {
          update: {
            quantityAvailable: book.quantityAvailable.value,
            status: PrismaBookRepository.statusDataMapper(book.status.value),
          },
        },
      },
    });

    // ここでイベントを発行する
    book.getDomainEvents().forEach((event) => {
      domainEventPublisher.publish(event);
    });
    book.clearDomainEvents();
  }

  public async delete(book: Book, domainEventPublisher: IDomainEventPublisher) {
    const client = this.clientManager.getClient();

    await client.book.delete({
      where: {
        id: book.id.value,
      },
    });

    // ここでイベントをパブリッシュする
    book.getDomainEvents().forEach((event) => {
      domainEventPublisher.publish(event);
    });
    book.clearDomainEvents();
  }

  public async find(bookId: BookId): Promise<Book | null> {
    const client = this.clientManager.getClient();

    const data = await client.book.findUnique({
      where: {
        id: bookId.value,
      },
      include: {
        stock: true,
      },
    });

    if (!data || !data.stock) {
      return null;
    }

    return Book.reconstruct(
      new BookId(data.id),
      new Title(data.title),
      new Price({ amount: data.priceAmount, currency: 'JPY' }),
      Stock.reconstruct(
        new StockId(data.stock.id),
        new QuantityAvailable(data.stock.quantityAvailable),
        PrismaBookRepository.statusEnumMapper(data.stock.status),
      ),
    );
  }

  public async findAll(): Promise<Book[]> {
    const client = this.clientManager.getClient();

    const data = await client.book.findMany({
      include: {
        stock: true,
      },
    });

    return data.map((item) => {
      if (!item.stock) {
        throw new Error(`Stock not found for book: ${item.id}`);
      }

      return Book.reconstruct(
        new BookId(item.id),
        new Title(item.title),
        new Price({ amount: item.priceAmount, currency: 'JPY' }),
        Stock.reconstruct(
          new StockId(item.stock.id),
          new QuantityAvailable(item.stock.quantityAvailable),
          PrismaBookRepository.statusEnumMapper(item.stock.status),
        ),
      );
    });
  }
}
