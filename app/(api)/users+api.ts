import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return createResponse(
      StatusCode.SUCCESS,
      'User fetched successfully',
      users,
    );
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
