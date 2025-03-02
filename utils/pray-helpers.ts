import { AWARDS } from '@/constants/awards';
import { SALAHS, PRAYER_POINTS, AWARD_TITLES } from '@/constants/enums';
import prisma from '@/lib/prisma';

export async function checkAndAssignAwards(userId: string) {
  const prayers = await prisma.prays.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30,
  });

  let streak = 0;
  let onTimeCount = 0;
  let tahajjudCount = 0;
  let lastDate: Date | null = null;
  const totalPossiblePrayers = prayers.length * 5;

  for (const prayer of prayers) {
    onTimeCount += Object.values(SALAHS).filter(
      (key) => prayer[key] === PRAYER_POINTS.ON_TIME,
    ).length;

    if (prayer.nafl === PRAYER_POINTS.ON_TIME) {
      tahajjudCount++;
    }

    if (lastDate) {
      const difference =
        (new Date(lastDate).getTime() - new Date(prayer.date).getTime()) /
        (24 * 60 * 60 * 1000);
      streak = difference === 1 ? streak + 1 : 1;
    } else {
      streak = 1;
    }

    lastDate = prayer.date;
  }

  const totalPrayersRecorded = await prisma.prays.count({ where: { userId } });

  const newAwards = [];

  // Assign awards using constants
  if (streak >= 7) newAwards.push(AWARD_TITLES.SEVEN_DAY_STREAK);
  if (streak >= 30) newAwards.push(AWARD_TITLES.THIRTY_DAY_STREAK);
  if (totalPrayersRecorded >= 100) newAwards.push(AWARD_TITLES.HUNDRED_PRAYERS);
  if (onTimeCount / totalPossiblePrayers >= 0.9)
    newAwards.push(AWARD_TITLES.PUNCTUAL_WORSHIPPER);
  if (tahajjudCount >= 15) newAwards.push(AWARD_TITLES.DEDICATED_TAHAJJUD);
  if (totalPrayersRecorded >= 50) newAwards.push(AWARD_TITLES.FIFTY_PRAYERS);
  if (totalPrayersRecorded >= 500)
    newAwards.push(AWARD_TITLES.FIVE_HUNDRED_PRAYERS);
  if (totalPrayersRecorded >= 1000)
    newAwards.push(AWARD_TITLES.THOUSAND_PRAYERS);

  for (const awardTitle of newAwards) {
    const award = AWARDS.find((a) => a.title === awardTitle);
    if (!award) continue;

    await prisma.award.upsert({
      where: { userId_title: { userId, title: award.title } },
      update: {},
      create: {
        userId,
        title: award.title,
        description: award.description,
      },
    });
  }

  // Assign and store new awards
  //   for (const award of newAwards) {
  //     // Upsert ensures we don't duplicate
  //     const saved = await prisma.award.upsert({
  //       where: {
  //         userId_title: { userId, title: award.title },
  //       },
  //       update: {},
  //       create: {
  //         userId,
  //         title: award.title,
  //         description: award.description,
  //         // Optional imageUrl if you have a dynamic or static URL
  //         image: null,
  //       },
  //     });

  //     if (saved) {
  //       await sendAwardNotification(userId, award.title);
  //     }
  //   }
}
