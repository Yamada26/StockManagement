import BookId from 'Domain/models/Book/BookId/BookId';
import IBookRepository from 'Domain/models/Book/IBookRepository';
import BookDTO from 'Application/Book/BookDTO';

export default class GetBookApplicationService {
  private bookRepository: IBookRepository;

  public constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  public async execute(isbn: string): Promise<BookDTO | null> {
    const book = await this.bookRepository.find(new BookId(isbn));

    return book ? new BookDTO(book) : null;
  }
}
