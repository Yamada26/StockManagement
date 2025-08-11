import { injectable, inject } from 'tsyringe';
import BookId from 'Domain/models/Book/BookId/BookId';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import BookDTO from 'Application/Book/BookDTO';

@injectable()
export default class GetBookApplicationService {
  private bookRepository: IBookRepository;

  public constructor(
    @inject('IBookRepository') bookRepository: IBookRepository,
  ) {
    this.bookRepository = bookRepository;
  }

  public async execute(isbn: string): Promise<BookDTO | null> {
    const book = await this.bookRepository.find(new BookId(isbn));

    return book ? new BookDTO(book) : null;
  }
}
