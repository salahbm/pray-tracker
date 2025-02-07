import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, MessageCodes, StatusCode } from '@/utils/status';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      throw new ApiError({
        message: 'Users not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }
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
