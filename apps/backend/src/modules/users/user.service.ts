import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { User, Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
