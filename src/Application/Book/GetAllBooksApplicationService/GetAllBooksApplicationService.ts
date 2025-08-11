import { injectable, inject } from 'tsyringe';
import { IBookRepository } from 'Domain/models/Book/IBookRepository';
import BookDTO from 'Application/Book/BookDTO';

@injectable()
export default class GetAllBooksApplicationService {
  private bookRepository: IBookRepository;

  public constructor(
    @inject('IBookRepository') bookRepository: IBookRepository,
  ) {
    this.bookRepository = bookRepository;
  }

  public async execute(): Promise<BookDTO[]> {
    const books = await this.bookRepository.findAll();

    return books.map((book) => new BookDTO(book));
  }
}
