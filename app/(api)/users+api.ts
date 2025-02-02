import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Users fetched successfully',
      code: MessageCodes.USER_FETCHED,
      data: users,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
