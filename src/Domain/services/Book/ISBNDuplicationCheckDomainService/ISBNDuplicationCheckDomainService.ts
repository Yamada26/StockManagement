import BookId from 'Domain/models/Book/BookId/BookId';
import IBookRepository from 'Domain/models/Book/IBookRepository';

export default class ISBNDuplicationCheckDomainService {
  private bookRepository: IBookRepository;

  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(isbn: BookId): Promise<boolean> {
    const duplicatedBook = await this.bookRepository.find(isbn);
    const isIsbnDuplicated = !!duplicatedBook;

    return isIsbnDuplicated;
  }
}
