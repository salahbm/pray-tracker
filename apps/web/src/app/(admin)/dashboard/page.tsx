'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDashboardStats } from '@/hooks/dashboard/use-get-stats';
import { Users, MessageSquare, CheckCircle, XCircle, TrendingUp, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">No data available</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      description: `+${stats.newUsersThisWeek} this week`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries.toLocaleString(),
      icon: MessageSquare,
      description: `${stats.openInquiries} open`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Open Inquiries',
      value: stats.openInquiries.toLocaleString(),
      icon: CheckCircle,
      description: 'Needs attention',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Closed Inquiries',
      value: stats.closedInquiries.toLocaleString(),
      icon: XCircle,
      description: 'Resolved',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'New Users (Month)',
      value: stats.newUsersThisMonth.toLocaleString(),
      icon: TrendingUp,
      description: 'This month',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Total Prayers',
      value: stats.totalPrayers.toLocaleString(),
      icon: Activity,
      description: 'All time',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your application metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={value => format(new Date(value), 'MMM dd')} />
                <YAxis />
                <Tooltip labelFormatter={value => format(new Date(value as string), 'PPP')} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="New Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inquiry Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Inquiry Trend</CardTitle>
            <CardDescription>Open vs Closed inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.inquiryTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={value => format(new Date(value), 'MMM dd')} />
                <YAxis />
                <Tooltip labelFormatter={value => format(new Date(value as string), 'PPP')} />
                <Legend />
                <Bar dataKey="open" fill="#f97316" name="Open" />
                <Bar dataKey="closed" fill="#22c55e" name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
