import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from '@/common/decorators/public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Get('stats')
  async getStats() {
    return this.adminService.getDashboardStats();
  }
}
