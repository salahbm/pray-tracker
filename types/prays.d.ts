export interface IPrays {
  id: string;
  userId: string;
  date: Date;
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  tahajjud: number;

  createdAt: Date;
  updatedAt: Date;
}
