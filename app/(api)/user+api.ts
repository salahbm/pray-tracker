import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, MessageCodes, StatusCode } from 'utils/status';

// CREATE USER
export async function POST(request: Request) {
  try {
    const { username, email, supabaseId, password } = await request.json();

    if (!username || !email || !supabaseId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { username, email, supabaseId },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        supabaseId,
        password,
      },
    });

    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'User created successfully',
      code: MessageCodes.USER_CREATED,
      data: newUser,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}

// GET USER
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const user = await prisma.user.findUnique({
      where: {
        supabaseId: id,
      },
    });
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'User fetched successfully',
      code: MessageCodes.USER_FETCHED,
      data: user,
    });
  } catch (error) {
    // Use handleError to standardize the response for all errors
    return handleError(error);
  }
}

// UPDATE USER
export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new ApiError('User not found', StatusCode.NOT_FOUND);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'User updated successfully',
      code: MessageCodes.USER_UPDATED,
      data: updatedUser,
    });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE USER
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return createResponse({
      status: StatusCode.SUCCESS,
      message: 'User deleted successfully',
      code: MessageCodes.USER_DELETED,
      data: deletedUser,
    });
  } catch (error) {
    return handleError(error);
  }
}
