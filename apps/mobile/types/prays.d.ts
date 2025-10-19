export interface IPrays {
  id: string;
  userId: string;
  date: Date;
  fajr: number | null;
  dhuhr: number | null;
  asr: number | null;
  maghrib: number | null;
  isha: number | null;
  nafl: number | null;

  createdAt: Date;
  updatedAt: Date;
}
