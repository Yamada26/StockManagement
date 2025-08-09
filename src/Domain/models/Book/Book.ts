import BookId from './BookId/BookId';
import Price from './Price/Price';
import QuantityAvailable from './Stock/QuantityAvailable/QuantityAvailable';
import { Status, StatusEnum } from './Stock/Status/Status';
import Stock from './Stock/Stock';
import StockId from './Stock/StockId/StockId';
import Title from './Title/Title';

export default class Book {
  private readonly _id: BookId;

  private _title: Title;

  private _price: Price;

  private readonly _stock: Stock;

  private constructor(id: BookId, title: Title, price: Price, stock: Stock) {
    this._id = id;
    this._title = title;
    this._price = price;
    this._stock = stock;
  }

  public static create(id: BookId, title: Title, price: Price): Book {
    return new Book(id, title, price, Stock.create());
  }

  public static reconstruct(
    id: BookId,
    title: Title,
    price: Price,
    stock: Stock,
  ): Book {
    return new Book(id, title, price, stock);
  }

  public delete(): void {
    this._stock.delete();
  }

  public changeTitle(title: Title): void {
    this._title = title;
  }

  public changePrice(price: Price): void {
    this._price = price;
  }

  public isSaleable(): boolean {
    return (
      this._stock.quantityAvailable.value > 0 &&
      this._stock.status.value !== StatusEnum.OutOfStock
    );
  }

  public increaseStock(amount: number): void {
    this._stock.increaseQuantity(amount);
  }

  public decreaseStock(amount: number): void {
    this._stock.decreaseQuantity(amount);
  }

  public get id(): BookId {
    return this._id;
  }

  public get title(): Title {
    return this._title;
  }

  public get price(): Price {
    return this._price;
  }

  public get stockId(): StockId {
    return this._stock.id;
  }

  public get quantityAvailable(): QuantityAvailable {
    return this._stock.quantityAvailable;
  }

  public get status(): Status {
    return this._stock.status;
  }
}
