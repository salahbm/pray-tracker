export type ClickedData = {
  date: string;
  details: { data: DayData };
};

export interface ErrorData {
  status: number;
  code: number;
  message: string;
  description: string;
}
