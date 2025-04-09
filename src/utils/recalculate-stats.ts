import prisma from '@/lib/prisma';

// Utility types
type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'nafl';
type OnTimeStatus = 0 | 1 | 2;

export const recalculateStats = async (userId: string) => {
  const allPrays = await prisma.prays.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  });

  if (!allPrays.length) return;

  // Base counters
  let totalPrayers = 0;
  let naflCount = 0;
  let earlyFajrCount = 0;
  let onTimeCount = 0;
  let consistencyDays = 0;

  // Streak tracking
  let currentStreak = 0;
  let longestStreak = 0;
  let missedPrayerStreak = 0;
  let streakCounter = 0;
  let lastDate: Date | null = null;

  // Fajr-specific streaks
  let fajrStreak = 0;
  let longestFajrStreak = 0;

  // Per-prayer totals
  const prayerTotals: Record<PrayerName, number> = {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    nafl: 0,
  };

  const prayerOnTimeTotals: Record<PrayerName, number> = {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    nafl: 0,
  };

  // Strike counters
  const strikeCounts: Record<PrayerName, number> = {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    nafl: 0,
  };

  // Track today
  const today = new Date();
  const todayString = today.toDateString();
  let lastActiveDay: Date | undefined;
  let lastFajrTime: Date | undefined;
  let lastNaflDate: Date | undefined;

  for (const p of allPrays) {
    const dateStr = p.date.toDateString();
    const isToday = dateStr === todayString;

    let prayedAll = true;

    (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as PrayerName[]).forEach(
      (prayer) => {
        const value = (p[prayer] ?? 0) as OnTimeStatus;

        prayerTotals[prayer] += value > 0 ? 1 : 0;
        if (value === 1) {
          prayerOnTimeTotals[prayer]++;
          onTimeCount++;
        }

        if (value > 0) {
          strikeCounts[prayer]++;
        } else {
          prayedAll = false;
        }

        // Fajr streak tracking
        if (prayer === 'fajr') {
          if (value > 0) {
            fajrStreak++;
            if (fajrStreak > longestFajrStreak) longestFajrStreak = fajrStreak;
            if (isToday) lastFajrTime = p.date;
          } else {
            fajrStreak = 0;
          }
        }
      },
    );

    // Nafl
    const nafl = (p.nafl ?? 0) as OnTimeStatus;
    if (nafl > 0) {
      naflCount += 1;
      strikeCounts.nafl += 1;
      if (isToday) lastNaflDate = p.date;
    }

    if ((p.fajr ?? 0) === 2) {
      earlyFajrCount++;
    }

    if (
      prayerTotals.fajr +
        prayerTotals.dhuhr +
        prayerTotals.asr +
        prayerTotals.maghrib +
        prayerTotals.isha >
      0
    ) {
      totalPrayers++;
    }

    // Consistency (5 prayers logged)
    if (
      (p.fajr ?? 0) > 0 &&
      (p.dhuhr ?? 0) > 0 &&
      (p.asr ?? 0) > 0 &&
      (p.maghrib ?? 0) > 0 &&
      (p.isha ?? 0) > 0
    ) {
      consistencyDays++;
      if (isToday) lastActiveDay = p.date;
    }

    // Streak logic
    if (lastDate) {
      const expected = new Date(lastDate);
      expected.setDate(expected.getDate() + 1);
      const isConsecutive = dateStr === expected.toDateString();

      if (isConsecutive && prayedAll) {
        streakCounter++;
      } else if (prayedAll) {
        streakCounter = 1;
      } else {
        streakCounter = 0;
        missedPrayerStreak++;
      }
    } else if (prayedAll) {
      streakCounter = 1;
    }

    currentStreak = dateStr === todayString ? streakCounter : currentStreak;
    longestStreak = Math.max(longestStreak, streakCounter);
    lastDate = p.date;
  }

  const safePercent = (count: number, total: number) =>
    total > 0 ? Math.round((count / total) * 100) : 0;

  await prisma.prayerStats.upsert({
    where: { userId },
    update: {
      totalPrayers,
      naflCount,
      currentStreak,
      longestStreak,
      fajrStreak,
      onTimePercentage: safePercent(onTimeCount, totalPrayers),
      earlyFajrPercentage: safePercent(earlyFajrCount, prayerTotals.fajr),
      fajrOnTimePercentage: safePercent(
        prayerOnTimeTotals.fajr,
        prayerTotals.fajr,
      ),
      dhuhrOnTimePercentage: safePercent(
        prayerOnTimeTotals.dhuhr,
        prayerTotals.dhuhr,
      ),
      asrOnTimePercentage: safePercent(
        prayerOnTimeTotals.asr,
        prayerTotals.asr,
      ),
      maghribOnTimePercentage: safePercent(
        prayerOnTimeTotals.maghrib,
        prayerTotals.maghrib,
      ),
      ishaOnTimePercentage: safePercent(
        prayerOnTimeTotals.isha,
        prayerTotals.isha,
      ),
      fajrStrike10: strikeCounts.fajr >= 10 ? 1 : 0,
      fajrStrike50: strikeCounts.fajr >= 50 ? 1 : 0,
      fajrStrike100: strikeCounts.fajr >= 100 ? 1 : 0,
      fajrStrike150: strikeCounts.fajr >= 150 ? 1 : 0,
      dhuhrStrike10: strikeCounts.dhuhr >= 10 ? 1 : 0,
      dhuhrStrike50: strikeCounts.dhuhr >= 50 ? 1 : 0,
      dhuhrStrike100: strikeCounts.dhuhr >= 100 ? 1 : 0,
      dhuhrStrike150: strikeCounts.dhuhr >= 150 ? 1 : 0,
      asrStrike10: strikeCounts.asr >= 10 ? 1 : 0,
      asrStrike50: strikeCounts.asr >= 50 ? 1 : 0,
      asrStrike100: strikeCounts.asr >= 100 ? 1 : 0,
      asrStrike150: strikeCounts.asr >= 150 ? 1 : 0,
      maghribStrike10: strikeCounts.maghrib >= 10 ? 1 : 0,
      maghribStrike50: strikeCounts.maghrib >= 50 ? 1 : 0,
      maghribStrike100: strikeCounts.maghrib >= 100 ? 1 : 0,
      maghribStrike150: strikeCounts.maghrib >= 150 ? 1 : 0,
      ishaStrike10: strikeCounts.isha >= 10 ? 1 : 0,
      ishaStrike50: strikeCounts.isha >= 50 ? 1 : 0,
      ishaStrike100: strikeCounts.isha >= 100 ? 1 : 0,
      ishaStrike150: strikeCounts.isha >= 150 ? 1 : 0,
      naflStrike10: strikeCounts.nafl >= 10 ? 1 : 0,
      naflStrike50: strikeCounts.nafl >= 50 ? 1 : 0,
      naflStrike100: strikeCounts.nafl >= 100 ? 1 : 0,
      naflStrike150: strikeCounts.nafl >= 150 ? 1 : 0,
      consistencyPercentage: safePercent(consistencyDays, allPrays.length),
      missedPrayerStreak,
      lastActiveDay,
      lastFajrTime,
      lastNaflDate,
    },
    create: {
      userId,
      level: 0,
      totalXP: 0,
      totalPrayers,
      naflCount,
      currentStreak,
      longestStreak,
      fajrStreak,
      onTimePercentage: safePercent(onTimeCount, totalPrayers),
      earlyFajrPercentage: safePercent(earlyFajrCount, prayerTotals.fajr),
      fajrOnTimePercentage: safePercent(
        prayerOnTimeTotals.fajr,
        prayerTotals.fajr,
      ),
      dhuhrOnTimePercentage: safePercent(
        prayerOnTimeTotals.dhuhr,
        prayerTotals.dhuhr,
      ),
      asrOnTimePercentage: safePercent(
        prayerOnTimeTotals.asr,
        prayerTotals.asr,
      ),
      maghribOnTimePercentage: safePercent(
        prayerOnTimeTotals.maghrib,
        prayerTotals.maghrib,
      ),
      ishaOnTimePercentage: safePercent(
        prayerOnTimeTotals.isha,
        prayerTotals.isha,
      ),
      fajrStrike10: 0,
      fajrStrike50: 0,
      fajrStrike100: 0,
      fajrStrike150: 0,
      dhuhrStrike10: 0,
      dhuhrStrike50: 0,
      dhuhrStrike100: 0,
      dhuhrStrike150: 0,
      asrStrike10: 0,
      asrStrike50: 0,
      asrStrike100: 0,
      asrStrike150: 0,
      maghribStrike10: 0,
      maghribStrike50: 0,
      maghribStrike100: 0,
      maghribStrike150: 0,
      ishaStrike10: 0,
      ishaStrike50: 0,
      ishaStrike100: 0,
      ishaStrike150: 0,
      naflStrike10: 0,
      naflStrike50: 0,
      naflStrike100: 0,
      naflStrike150: 0,
      consistencyPercentage: safePercent(consistencyDays, allPrays.length),
      missedPrayerStreak,
      lastActiveDay,
      lastFajrTime,
      lastNaflDate,
    },
  });
};
