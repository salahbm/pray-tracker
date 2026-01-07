export type InquiryStatus = 'OPEN' | 'CLOSED';
export type InquirySenderRole = 'USER' | 'OWNER';

export interface InquiryMessage {
  id: string;
  inquiryId: string;
  senderRole: InquirySenderRole;
  body: string;
  userId?: string | null;
  createdAt: Date;
}

export interface Inquiry {
  id: string;
  userId?: string | null;
  email: string;
  subject: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
  messages: InquiryMessage[];
}

export interface InquiryListItem {
  id: string;
  userId?: string | null;
  email: string;
  subject: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: InquiryMessage | null;
  messageCount: number;
}
