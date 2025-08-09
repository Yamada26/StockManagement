import InMemoryBookRepository from 'Infrastructure/InMemory/Book/InMemoryBookRepository';
import bookTestDataCreator from 'Infrastructure/shared/Book/bookTestDataCreator';
import GetAllBooksApplicationService from './GetAllBooksApplicationService';
import BookDTO from '../BookDTO';

describe('GetAllBooksApplicationService', () => {
  it('全ての書籍が存在する場合、DTOに詰め替えられ、取得できる', async () => {
    const repository = new InMemoryBookRepository();
    const getAllBooksApplicationService = new GetAllBooksApplicationService(
      repository,
    );

    // テスト用データ作成
    const createdBook = await bookTestDataCreator(repository)({});

    const data = await getAllBooksApplicationService.execute();

    expect(data).toEqual([new BookDTO(createdBook)]);
  });

  it('書籍が存在しない場合、空の配列が取得できる', async () => {
    const repository = new InMemoryBookRepository();
    const getAllBooksApplicationService = new GetAllBooksApplicationService(
      repository,
    );

    const data = await getAllBooksApplicationService.execute();

    expect(data).toEqual([]);
  });
});
