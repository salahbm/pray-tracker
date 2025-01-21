export function generateDummyData({
  year = new Date().getFullYear(),
  months = [0, 11], // Range of months (0 = January, 11 = December)
  scoreRange = [0, 2], // Range for random scores
  prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud'], // Prayer names
}: {
  year?: number;
  months?: [number, number];
  scoreRange?: [number, number];
  prayers?: string[];
}): Record<string, Record<string, number>> {
  const dummyData: Record<string, Record<string, number>> = {};

  for (let month = months[0]; month <= months[1]; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dummyData[dateKey] = prayers.reduce(
        (acc, prayer) => {
          acc[prayer] =
            Math.floor(Math.random() * (scoreRange[1] - scoreRange[0] + 1)) +
            scoreRange[0];
          return acc;
        },
        {} as Record<string, number>,
      );
    }
  }

  return dummyData;
}
