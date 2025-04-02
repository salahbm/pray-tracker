import prisma from '@/lib/prisma';
import { ApiError, handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function GET() {
  try {
    const proSetting = await prisma.pro.findFirst();

    if (!proSetting) {
      throw new ApiError({
        message: 'Pro settings not found',
        status: StatusCode.NOT_FOUND,
      });
    }

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'Pro visibility fetched successfully',
      data: proSetting,
    });
  } catch (error) {
    return handleError(error);
  }
}
