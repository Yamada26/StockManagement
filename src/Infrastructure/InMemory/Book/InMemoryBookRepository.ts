import Book from 'Domain/models/Book/Book';
import BookId from 'Domain/models/Book/BookId/BookId';
import IBookRepository from 'Domain/models/Book/IBookRepository';

export default class InMemoryBookRepository implements IBookRepository {
  public DB: {
    [id: string]: Book;
  } = {};

  public async save(book: Book) {
    this.DB[book.id.value] = book;
  }

  public async update(book: Book) {
    this.DB[book.id.value] = book;
  }

  public async delete(bookId: BookId) {
    delete this.DB[bookId.value];
  }

  public async find(bookId: BookId): Promise<Book | null> {
    const book = Object.entries(this.DB).find(
      ([id]) => bookId.value === id.toString(),
    );

    return book ? book[1] : null;
  }
}
