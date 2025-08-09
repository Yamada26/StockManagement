import { Prisma, PrismaClient } from '@prisma/client';
import { IDataAccessClientManager } from 'Infrastructure/shared/IDataAccessClientManager';
import prisma from './prismaClient';

type Client = PrismaClient | Prisma.TransactionClient;
export default class PrismaClientManager
  implements IDataAccessClientManager<Client>
{
  private client: Client = prisma;

  public setClient(client: Client): void {
    this.client = client;
  }

  public getClient(): Client {
    return this.client;
  }
}
