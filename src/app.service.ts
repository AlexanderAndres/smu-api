import { Injectable } from '@nestjs/common';
import { PrismaService } from './utils/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHealth(): string {
    return 'Server Up';
  }
  async getHealthDb(): Promise<any> {
    try {
      await this.prisma.$connect();
      return 'db is connected';
    } catch (error) {
      console.log('[DB ERROR]:', error);
      return 'db is not connected';
    } finally {
      this.prisma.$disconnect();
    }
  }
}
