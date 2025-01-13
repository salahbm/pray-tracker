import { DB } from '~/lib/prisma';
import { ApiError, handleError } from '~/utils/error';
import { createResponse, StatusCode } from '~/utils/status';

export async function POST(request: Request) {
  try {
    const { username, email, clerkId } = await request.json();

    if (!username || !email || !clerkId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { username, email, clerkId },
      });
    }

    const newUser = await DB.user.create({
      data: {
        username,
        email,
        clerkId,
      },
    });

    return createResponse(
      StatusCode.CREATED,
      'User created successfully',
      newUser,
    );
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}
