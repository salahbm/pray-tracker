import { SALAHS, PRAYER_POINTS } from '@/constants/enums';
import prisma from '@/lib/prisma';

export async function checkAndAssignAwards(userId: string) {
  // Get latest 30 days of prayers
  const prayers = await prisma.prays.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30,
  });

  // Gather stats
  let streak = 0;
  let onTimeCount = 0;
  let tahajjudCount = 0;
  let lastDate: Date | null = null;
  const totalPossiblePrayers = prayers.length * 5; // 5 daily obligatory prayers

  for (const prayer of prayers) {
    // Count how many prayers are "ON_TIME" in each record
    onTimeCount += Object.values(SALAHS).filter(
      (key) => prayer[key] === PRAYER_POINTS.ON_TIME,
    ).length;

    // Count tahajjud if on time (or any positive scoring logic)
    if (prayer.tahajjud === PRAYER_POINTS.ON_TIME) {
      tahajjudCount++;
    }

    // Calculate consecutive daily streak
    if (lastDate) {
      const difference =
        (new Date(lastDate).getTime() - new Date(prayer.date).getTime()) /
        (24 * 60 * 60 * 1000);
      if (difference === 1) {
        streak++;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
    lastDate = prayer.date;
  }

  // Additional checks for lifetime prayers, etc.
  const totalPrayersRecorded = await prisma.prays.count({ where: { userId } });

  const newAwards = [];

  // Sample conditions:
  if (streak >= 7) {
    newAwards.push({
      title: '7-Day Devotion',
      description: 'You prayed 7 days consecutively!',
    });
  }
  if (streak >= 30) {
    newAwards.push({
      title: '30-Day Warrior',
      description: 'You prayed 30 days consecutively!',
    });
  }
  if (totalPrayersRecorded >= 100) {
    newAwards.push({
      title: '100 Prayers Logged',
      description: 'You have recorded 100 prayers in total!',
    });
  }
  if (onTimeCount / totalPossiblePrayers >= 0.9) {
    newAwards.push({
      title: 'Punctual Worshipper',
      description: '90% of your prayers were on time this month!',
    });
  }
  if (tahajjudCount >= 15) {
    newAwards.push({
      title: 'Dedicated Worshipper',
      description: 'You prayed Tahajjud 15 times this month!',
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
