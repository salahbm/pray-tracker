export interface RamadanCalendarDay {
  gregorianDate: string;
  hijriDate: string;
  hijriDay: number;
  hijriMonth: number;
  hijriMonthName: string;
  hijriYear: number;
  fajr: string;
  maghrib: string;
}

export type RamadanEvent = 'suhoor' | 'iftar';

export type RamadanStatus = 'Fasting' | 'Iftar Time' | 'Suhoor Time';

export interface RamadanCountdownState {
  nextEvent: RamadanEvent;
  targetTime: Date;
  remainingMs: number;
  status: RamadanStatus;
  isSoon: boolean;
}
