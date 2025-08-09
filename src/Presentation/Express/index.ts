// Reflectのポリフィルをcontainer.resolveされる前に一度読み込む必要がある
import 'reflect-metadata';
import '../../Program';
import { container } from 'tsyringe';

import express from 'express';

import {
  RegisterBookApplicationService,
  RegisterBookCommand,
} from 'Application/Book/RegisterBookApplicationService/RegisterBookApplicationService';
import GetBookApplicationService from 'Application/Book/GetBookApplicationService/GetBookApplicationService';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// JSON形式のリクエストボディを正しく解析するために必要
app.use(express.json());
app.post('/books', async (req, res) => {
  try {
    const requestBody = req.body as {
      isbn: string;
      title: string;
      priceAmount: number;
    };

    // const clientManager = new PrismaClientManager();
    // const transactionManager = new PrismaTransactionManager(clientManager);
    // const bookRepository = new PrismaBookRepository(clientManager);
    // const registerBookApplicationService = new RegisterBookApplicationService(
    //   bookRepository,
    //   transactionManager,
    // );

    const registerBookApplicationService = container.resolve(
      RegisterBookApplicationService,
    );

    // リクエストボディをコマンドに変換。今回はたまたま一致しているため、そのまま渡している。
    const registerBookCommand: RegisterBookCommand = requestBody;
    await registerBookApplicationService.execute(registerBookCommand);

    // 実際は詳細なレスポンスを返す
    res.status(200).json({ message: 'success' });
  } catch (error) {
    // 実際はエラーを解析し、詳細なレスポンスを返す。また、ロギングなどを行う。
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/books/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;

    const getBookApplicationService = container.resolve(
      GetBookApplicationService,
    );

    const book = await getBookApplicationService.execute(isbn);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
