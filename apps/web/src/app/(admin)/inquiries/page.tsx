'use client';

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
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetInquiries } from '@/hooks/inquiries/use-get-inquiries';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { InquiryStatus } from '@/types/index';

export default function InquiriesPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<'OPEN' | 'CLOSED' | undefined>(undefined);
  const limit = 20;

  const { data, isLoading } = useGetInquiries({ page, limit, status });

  const handleTabChange = (value: string) => {
    setStatus(value === 'all' ? undefined : (value as 'OPEN' | 'CLOSED'));
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="mt-2 text-gray-600">Manage customer support inquiries</p>
      </div>

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Inquiries</TabsTrigger>
          <TabsTrigger value="OPEN">Open</TabsTrigger>
          <TabsTrigger value="CLOSED">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={status === undefined ? 'all' : status} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {status === 'OPEN'
                  ? 'Open Inquiries'
                  : status === 'CLOSED'
                    ? 'Closed Inquiries'
                    : 'All Inquiries'}
              </CardTitle>
              <CardDescription>
                {data?.meta.total ? `${data.meta.total} total inquiries` : 'Loading...'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="text-gray-500">Loading inquiries...</div>
                </div>
              ) : !data?.data.length ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="text-gray-500">No inquiries found</div>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Messages</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data.map(inquiry => (
                        <TableRow key={inquiry.id}>
                          <TableCell className="font-medium">{inquiry.subject}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                inquiry.status === InquiryStatus.OPEN ? 'warning' : 'success'
                              }
                            >
                              {inquiry.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {inquiry.messages?.length ?? 0} messages
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {format(new Date(inquiry.updatedAt), 'MMM dd, yyyy')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/inquiries/${inquiry.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {data.meta.totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <div className="text-sm text-gray-500">
                        Showing {(page - 1) * limit + 1} to{' '}
                        {Math.min(page * limit, data.meta.total)} of {data.meta.total} inquiries
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
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
