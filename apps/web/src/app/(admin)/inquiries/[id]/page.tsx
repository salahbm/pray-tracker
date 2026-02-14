'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send } from 'lucide-react';
import { format } from 'date-fns';
import { InquiryStatus } from '@/types/index';
import { useGetInquiry } from '@/hooks/inquiries/use-get-inquiry';
import { useSendReply } from '@/hooks/inquiries/use-send-reply';
import { useUpdateInquiryStatus } from '@/hooks/inquiries/use-update-inquiry-status';

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [reply, setReply] = useState('');
  const { data: inquiry, isLoading } = useGetInquiry(id);
  const { mutate: sendReply, isPending: isSending } = useSendReply();
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateInquiryStatus();

  const handleSendReply = () => {
    if (!reply.trim()) return;
    sendReply(
      { inquiryId: id, message: reply },
      {
        onSuccess: () => {
          setReply('');
        },
      }
    );
  };

  const handleCloseInquiry = () => {
    if (!id || inquiry?.status === InquiryStatus.CLOSED) return;
    updateStatus({ inquiryId: id, status: InquiryStatus.CLOSED });
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg text-gray-500">Loading inquiry...</div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <div className="text-lg text-gray-500">Inquiry not found (ID: {id})</div>
        <Button onClick={() => router.push('/inquiries')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inquiries
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/inquiries')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Details</h1>
          <p className="mt-1 text-gray-600">View and respond to inquiry</p>
        </div>
        {inquiry.status === InquiryStatus.OPEN && (
          <Button variant="outline" onClick={handleCloseInquiry} disabled={isUpdatingStatus}>
            {isUpdatingStatus ? 'Closing...' : 'Close Inquiry'}
          </Button>
        )}
        <Badge variant={inquiry.status === InquiryStatus.OPEN ? 'warning' : 'success'}>
          {inquiry.status}
        </Badge>
      </div>

      {/* Inquiry Info */}
      <Card>
        <CardHeader>
          <CardTitle>{inquiry.subject}</CardTitle>
          <CardDescription>
            From {inquiry.email} • Created {format(new Date(inquiry.createdAt), 'PPP')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>{inquiry.messages?.length ?? 0} messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inquiry.messages && inquiry.messages.length > 0 ? (
              inquiry.messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`rounded-lg border p-4 ${
                    message.senderRole === 'USER'
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant={message.senderRole === 'USER' ? 'default' : 'secondary'}>
                      {message.senderRole === 'USER' ? 'User' : 'Admin'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {format(new Date(message.createdAt), 'PPp')}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700">{message?.body}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reply Form */}
      {inquiry.status === InquiryStatus.OPEN && (
        <Card>
          <CardHeader>
            <CardTitle>Send Reply</CardTitle>
            <CardDescription>Respond to this inquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={e => setReply(e.target.value)}
                rows={5}
                className="resize-none w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setReply('')} disabled={isSending}>
                  Clear
                </Button>
                <Button onClick={handleSendReply} disabled={!reply.trim() || isSending}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSending ? 'Sending...' : 'Send Reply'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
