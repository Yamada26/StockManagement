import { injectable, inject } from 'tsyringe';
import { ITransactionManager } from '../../Application/shared/ITransactionManager';
import prisma from './prismaClient';
import PrismaClientManager from './PrismaClientManager';

@injectable()
export default class PrismaTransactionManager implements ITransactionManager {
  private clientManager: PrismaClientManager;

  public constructor(
    @inject('IDataAccessClientManager') clientManager: PrismaClientManager,
  ) {
    this.clientManager = clientManager;
  }

  public async begin<T>(callback: () => Promise<T>): Promise<T | undefined> {
    return prisma.$transaction(async (transaction) => {
      this.clientManager.setClient(transaction);

      const res = await callback();
      // リセット
      this.clientManager.setClient(prisma);

      return res;
    });
  }
}
