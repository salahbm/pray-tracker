import prisma from '@/lib/prisma';
import { handleError } from '@/utils/error';
import { createResponse, StatusCode } from '@/utils/status';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, fajr, dhuhr, asr, maghrib, isha, tahajjud, userId } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({
          status: StatusCode.UNAUTHORIZED,
          code: StatusCode.UNAUTHORIZED,
          message: 'Please, Sign In to create a Pray',
          details: { userId },
        }),
        { status: StatusCode.UNAUTHORIZED },
      );
    }

    // Upsert Pray record
    const updatedPray = await prisma.pray.upsert({
      where: {
        // Use the composite unique constraint explicitly
        date_praysId: {
          date,
          praysId: userId,
        },
      },
      update: {
        fajr: { increment: fajr || 0 },
        dhuhr: { increment: dhuhr || 0 },
        asr: { increment: asr || 0 },
        maghrib: { increment: maghrib || 0 },
        isha: { increment: isha || 0 },
        tahajjud: { increment: tahajjud || 0 },
      },
      create: {
        date,
        fajr: fajr || 0,
        dhuhr: dhuhr || 0,
        asr: asr || 0,
        maghrib: maghrib || 0,
        isha: isha || 0,
        tahajjud: tahajjud || 0,
        praysId: userId, // Set praysId correctly
      },
    });
    // Recalculate total points for the user
    const userTotalPoints = await prisma.pray.aggregate({
      _sum: {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        tahajjud: true,
      },
      where: {
        praysId: userId,
      },
    });

    // Update user's totalPoints
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: Object.values(userTotalPoints._sum).reduce(
          (acc: number, val: number) => acc + (val || 0),
          0,
        ),
      },
    });

    return createResponse(
      StatusCode.SUCCESS,
      'Pray updated successfully',
      updatedPray,
    );
  } catch (error) {
    return handleError(error);
  }
}
