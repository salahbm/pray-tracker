import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, you are trying to access the backend for Noor - Pray Tracker';
  }
}
