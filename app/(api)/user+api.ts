import prisma from 'lib/prisma';
import { ApiError, handleError } from 'utils/error';
import { createResponse, StatusCode } from 'utils/status';

export async function POST(request: Request) {
  try {
    const { username, email, clerkId } = await request.json();

    if (!username || !email || !clerkId) {
      throw new ApiError('Missing required fields', StatusCode.BAD_REQUEST, {
        fields: { username, email, clerkId },
      });
    }

    const newUser = await prisma.user.create({
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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const users = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });
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

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: id },
    });
    if (!existingUser) {
      throw new ApiError('User not found', StatusCode.NOT_FOUND);
    }

    const updatedUser = await prisma.user.update({
      where: { clerkId: id },
      data,
    });
    return createResponse(
      StatusCode.SUCCESS,
      'User updated successfully',
      updatedUser,
    );
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
    return createResponse(
      StatusCode.SUCCESS,
      'User deleted successfully',
      deletedUser,
    );
  } catch (error) {
    return handleError(error);
  }
}
