import Book from 'Domain/models/Book/Book';
import { StatusLabel } from 'Domain/models/Book/Stock/Status/Status';

export default class BookDTO {
  public readonly id: string;

  public readonly title: string;

  public readonly price: number;

  public readonly stockId: string;

  public readonly quantityAvailable: number;

  public readonly status: StatusLabel;

  public constructor(book: Book) {
    this.id = book.id.value;
    this.title = book.title.value;
    this.price = book.price.value.amount;
    this.stockId = book.stockId.value;
    this.quantityAvailable = book.quantityAvailable.value;
    this.status = book.status.toLabel();
  }
}
