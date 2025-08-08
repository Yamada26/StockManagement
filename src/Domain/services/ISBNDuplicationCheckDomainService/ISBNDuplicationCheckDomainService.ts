import BookId from 'Domain/models/Book/BookId/BookId';

export default class ISBNDuplicationCheckDomainService {
  // eslint-disable-next-line class-methods-use-this
  async execute(isbn: BookId): Promise<boolean> {
    const isIsbnDuplicated = false;

    return isIsbnDuplicated;
  }
}
