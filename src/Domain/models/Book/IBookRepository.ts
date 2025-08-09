import Book from './Book';
import BookId from './BookId/BookId';

export default interface IBookRepository {
  save(book: Book): Promise<void>;
  update(book: Book): Promise<void>;
  delete(id: BookId): Promise<void>;
  find(id: BookId): Promise<Book | null>;
  findAll(): Promise<Book[]>;
}
