import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma.service';
import { subDays, startOfDay, endOfDay, format } from 'date-fns';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const now = new Date();
    const weekAgo = subDays(now, 7);
    const monthAgo = subDays(now, 30);
    const thirtyDaysAgo = subDays(now, 30);

    // Parallel queries for better performance
    const [
      totalUsers,
      totalInquiries,
      openInquiries,
      closedInquiries,
      newUsersThisWeek,
      newUsersThisMonth,
      totalPrayers,
      userGrowthData,
      inquiryTrendData,
    ] = await Promise.all([
      // Total users
      this.prisma.user.count(),

      // Total inquiries
      this.prisma.inquiry.count(),

      // Open inquiries
      this.prisma.inquiry.count({ where: { status: 'OPEN' } }),

      // Closed inquiries
      this.prisma.inquiry.count({ where: { status: 'CLOSED' } }),

      // New users this week
      this.prisma.user.count({
        where: { createdAt: { gte: weekAgo } },
      }),

      // New users this month
      this.prisma.user.count({
        where: { createdAt: { gte: monthAgo } },
      }),

      // Total prayers
      this.prisma.prayer.aggregate({
        _sum: {
          fajr: true,
          dhuhr: true,
          asr: true,
          maghrib: true,
          isha: true,
        },
      }),

      // User growth (last 30 days)
      this.getUserGrowth(thirtyDaysAgo, now),

      // Inquiry trend (last 30 days)
      this.getInquiryTrend(thirtyDaysAgo, now),
    ]);

    const totalPrayersCount =
      (totalPrayers._sum.fajr || 0) +
      (totalPrayers._sum.dhuhr || 0) +
      (totalPrayers._sum.asr || 0) +
      (totalPrayers._sum.maghrib || 0) +
      (totalPrayers._sum.isha || 0);

    return {
      totalUsers,
      totalInquiries,
      openInquiries,
      closedInquiries,
      newUsersThisWeek,
      newUsersThisMonth,
      totalPrayers: totalPrayersCount,
      userGrowth: userGrowthData,
      inquiryTrend: inquiryTrendData,
    };
  }

  private async getUserGrowth(startDate: Date, endDate: Date) {
    const users = await this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Group by date
    const grouped = users.reduce(
      (acc, user) => {
        const date = format(startOfDay(user.createdAt), 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Fill in missing dates with 0
    const result: Array<{ date: string; count: number }> = [];
    let currentDate = startOfDay(startDate);
    const end = endOfDay(endDate);

    while (currentDate <= end) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      result.push({
        date: dateStr,
        count: grouped[dateStr] || 0,
      });
      currentDate = subDays(currentDate, -1); // Add 1 day
    }

    return result;
  }

  private async getInquiryTrend(startDate: Date, endDate: Date) {
    const inquiries = await this.prisma.inquiry.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Group by date and status
    const grouped = inquiries.reduce(
      (acc, inquiry) => {
        const date = format(startOfDay(inquiry.createdAt), 'yyyy-MM-dd');
        if (!acc[date]) {
          acc[date] = { open: 0, closed: 0 };
        }
        if (inquiry.status === 'OPEN') {
          acc[date].open += 1;
        } else {
          acc[date].closed += 1;
        }
        return acc;
      },
      {} as Record<string, { open: number; closed: number }>,
    );

    // Fill in missing dates with 0
    const result: Array<{ date: string; open: number; closed: number }> = [];
    let currentDate = startOfDay(startDate);
    const end = endOfDay(endDate);

    while (currentDate <= end) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      result.push({
        date: dateStr,
        open: grouped[dateStr]?.open || 0,
        closed: grouped[dateStr]?.closed || 0,
      });
      currentDate = subDays(currentDate, -1); // Add 1 day
    }

    return result;
  }
}
