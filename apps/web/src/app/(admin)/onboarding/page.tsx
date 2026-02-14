'use client';

import { format } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetOnboardingPreferences } from '@/hooks/onboarding/use-get-onboarding-preferences';
import { Button } from '@/components/ui/button';
import { useGetOnboardingStats } from '@/hooks/onboarding/use-get-onboarding-stats';

const toLabel = (value?: string | null) => {
  if (!value) return 'Unknown';
  return value
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const mapToChartData = (counts: Record<string, number>) => {
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .map(item => ({ ...item, name: toLabel(item.name) }))
    .sort((a, b) => b.value - a.value);
};

export default function OnboardingPage() {
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isLoading } = useGetOnboardingPreferences({ page, limit });
  const { data: stats, isLoading: isLoadingStats } = useGetOnboardingStats();
  const rows = data?.data ?? [];

  if (isLoading || isLoadingStats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">Loading onboarding analytics...</div>
      </div>
    );
  }

  const knowledgeData = mapToChartData(stats?.prayerKnowledge ?? {});
  const sourceData = mapToChartData(stats?.attributionSources ?? {});
  const tabData = mapToChartData(stats?.defaultHomeTab ?? {});
  const pieColors = ['#0EA5E9', '#14B8A6', '#F59E0B', '#8B5CF6', '#F43F5E', '#10B981'];
  const barColors = ['#2563EB', '#7C3AED', '#F59E0B', '#EF4444', '#10B981', '#06B6D4'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Onboarding</h1>
        <p className="mt-2 text-gray-600">All users onboarding analytics and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Onboarded Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats?.total ?? 0).toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Location Granted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats?.locationPermissionGranted ?? 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notifications Granted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats?.notificationPermissionGranted ?? 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Default Tab</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tabData[0]?.name ?? 'N/A'}</div>
          </CardContent>
        </Card>
      </div>

      {!rows.length ? (
        <Card>
          <CardHeader>
            <CardTitle>No onboarding data</CardTitle>
            <CardDescription>No users have saved onboarding preferences yet.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Prayer Knowledge Distribution</CardTitle>
                <CardDescription>How users describe their prayer knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={knowledgeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={70} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Users">
                      {knowledgeData.map((entry, index) => (
                        <Cell
                          key={`knowledge-${entry.name}`}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attribution Sources</CardTitle>
                <CardDescription>Where users heard about the app</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={sourceData} dataKey="value" nameKey="name" outerRadius={100} label>
                      {sourceData.map((entry, index) => (
                        <Cell
                          key={`source-${entry.name}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Onboarding Records</CardTitle>
              <CardDescription>Per-user onboarding preferences (email-based)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Prayer Knowledge</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Notifications</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.email}</TableCell>
                      <TableCell>{toLabel(item.prayerKnowledge)}</TableCell>
                      <TableCell>{toLabel(item.whereDidYouHearAboutUs)}</TableCell>
                      <TableCell>
                        <Badge variant={item.locationPermissionGranted ? 'success' : 'secondary'}>
                          {item.locationPermissionGranted ? 'Granted' : 'Not granted'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.notificationPermissionGranted ? 'success' : 'secondary'}
                        >
                          {item.notificationPermissionGranted ? 'Granted' : 'Not granted'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {format(new Date(item.updatedAt), 'PPp')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!!data && data.meta.totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-gray-500">
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, data.meta.total)} of{' '}
                    {data.meta.total} onboarding records
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(data.meta.totalPages, p + 1))}
                      disabled={page === data.meta.totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
