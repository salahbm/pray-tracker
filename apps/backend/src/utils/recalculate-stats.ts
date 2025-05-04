import { prisma } from '../lib/prisma';

// Define the prayer names as a tuple type for safety
const prayerNames = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
type PrayerName = (typeof prayerNames)[number];

export const recalculateStats = async (userId: string) => {
  // 1. Query overall counts concurrently
  const [totalDays, naflCount, consistencyDays] = await prisma.$transaction([
    // Total number of prayer records (days) logged
    prisma.prays.count({
      where: { userId },
    }),
    // Count days where nafl prayer was logged (greater than 0)
    prisma.prays.count({
      where: { userId, nafl: { gt: 0 } },
    }),
    // Count days where all mandatory prayers (fajr, dhuhr, asr, maghrib, isha) were performed (value > 0)
    prisma.prays.count({
      where: {
        userId,
        fajr: { gt: 0 },
        dhuhr: { gt: 0 },
        asr: { gt: 0 },
        maghrib: { gt: 0 },
        isha: { gt: 0 },
      },
    }),
  ]);

  // 2. For each prayer, get the count of days that were 'on-time' (status === 2)
  //    and the count of days that the prayer was performed (value > 0)
  const counts = await Promise.all(
    prayerNames.map(async (prayer) => {
      const [onTimeCount, prayedCount] = await prisma.$transaction([
        prisma.prays.count({
          where: { userId, [prayer]: 2 },
        }),
        prisma.prays.count({
          where: { userId, [prayer]: { gt: 0 } },
        }),
      ]);
      return { prayer, onTimeCount, prayedCount };
    })
  );

  // Compute on-time percentages for each prayer
  const onTimePercentages: Record<PrayerName, number> = counts.reduce(
    (acc, { prayer, onTimeCount, prayedCount }) => {
      acc[prayer] =
        prayedCount > 0 ? Math.round((onTimeCount / prayedCount) * 100) : 0;
      return acc;
    },
    {} as Record<PrayerName, number>
  );

  // 3. Calculate current streak using only recent days (e.g. last 30 records)
  //    Assumption: The streak is defined by consecutive days where all mandatory prayers (fajr, dhuhr, asr, maghrib, isha) are logged.
  const recentPrays = await prisma.prays.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30,
  });

  let currentStreak = 0;
  // Set our expected date starting with today's date
  let expectedDate = new Date().toDateString();

  // Assuming recentPrays are in descending order
  for (const record of recentPrays) {
    const recordDate = new Date(record.date).toDateString();
    if (recordDate === expectedDate) {
      // Verify if all mandatory prayers were performed
      const allPrayed =
        record.fajr > 0 &&
        record.dhuhr > 0 &&
        record.asr > 0 &&
        record.maghrib > 0 &&
        record.isha > 0;
      if (!allPrayed) break;
      currentStreak++;
      // Move to the previous day
      const dt = new Date(expectedDate);
      dt.setDate(dt.getDate() - 1);
      expectedDate = dt.toDateString();
    } else if (new Date(record.date) < new Date(expectedDate)) {
      // If the record is before our expected date, we've encountered a gap.
      break;
    }
  }

  // 4. Prepare the stats object.
  //    Calculate consistency percentage as the percentage of days with all prayers logged.
  const consistencyPercentage =
    totalDays > 0 ? Math.round((consistencyDays / totalDays) * 100) : 0;

  const statsData = {
    totalPrayers: totalDays,
    naflCount,
    consistencyPercentage,
    currentStreak,
    // On-time percentages per prayer:
    fajrOnTimePercentage: onTimePercentages.fajr,
    dhuhrOnTimePercentage: onTimePercentages.dhuhr,
    asrOnTimePercentage: onTimePercentages.asr,
    maghribOnTimePercentage: onTimePercentages.maghrib,
    ishaOnTimePercentage: onTimePercentages.isha,
  };

  // 5. Persist the calculated stats using upsert. The fields not recalculated here can be defaulted to zero or preserved.
  await prisma.prayerStats.upsert({
    where: { userId },
    update: {
      totalPrayers: totalDays,
      naflCount,
      consistencyPercentage,
      currentStreak,
      fajrOnTimePercentage: onTimePercentages.fajr,
      dhuhrOnTimePercentage: onTimePercentages.dhuhr,
      asrOnTimePercentage: onTimePercentages.asr,
      maghribOnTimePercentage: onTimePercentages.maghrib,
      ishaOnTimePercentage: onTimePercentages.isha,
    },
    create: {
      userId,
      totalPrayers: totalDays,
      naflCount,
      consistencyPercentage,
      currentStreak,
      level: 0,
      totalXP: 0,
      fajrOnTimePercentage: onTimePercentages.fajr,
      dhuhrOnTimePercentage: onTimePercentages.dhuhr,
      asrOnTimePercentage: onTimePercentages.asr,
      maghribOnTimePercentage: onTimePercentages.maghrib,
      ishaOnTimePercentage: onTimePercentages.isha,
    },
  });

  // Return the summary stats (optional, could be used by other processes)
  return statsData;
};
