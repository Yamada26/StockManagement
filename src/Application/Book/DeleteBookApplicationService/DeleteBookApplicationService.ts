import { ITransactionManager } from 'Application/shared/ITransactionManager';
import BookId from 'Domain/models/Book/BookId/BookId';
import IBookRepository from 'Domain/models/Book/IBookRepository';

export type DeleteBookCommand = {
  bookId: string;
};
export class DeleteBookApplicationService {
  private bookRepository: IBookRepository;

  private transactionManager: ITransactionManager;

  public constructor(
    bookRepository: IBookRepository,
    transactionManager: ITransactionManager,
  ) {
    this.bookRepository = bookRepository;
    this.transactionManager = transactionManager;
  }

  public async execute(command: DeleteBookCommand): Promise<void> {
    await this.transactionManager.begin(async () => {
      const book = await this.bookRepository.find(new BookId(command.bookId));

      if (!book) {
        throw new Error('書籍が存在しません');
      }

      book.delete();

      await this.bookRepository.delete(book.id);
    });
  }
}
