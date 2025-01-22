export interface IPray {
  id: string;
  date: Date;
  fajr: number; // Prayer Points
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  tahajjud: number;
  praysId: string;
}

export interface IPrays {
  id: string;
  userId: string;
  prays: IPray[];
}
