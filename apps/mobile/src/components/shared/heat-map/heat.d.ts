// Props for the HeatMap component
export interface HeatMapProps {
  data: Record<string, DayData>; // Keyed by date in 'YYYY-MM-DD'
  color?: ColorProps;
  defaultBackgroundColor?: string;
  year?: number;
  onDayClick?: (date: string, details: { data: DayData | null }) => void;
  locale?: string;
}

// Data structure for a single day's data
export interface DayData {
  [key: string]: number; // Example: { "eventA": 5, "eventB": 3 }
}

// Color configuration for the heatmap
export interface OpacityProps {
  opacity: number;
  limit: number;
}

export interface ColorProps {
  theme: string;
  opacity: OpacityProps[];
}
// Processed data for each month
export interface MonthData {
  scores: number[]; // Array of scores for each day
  dates: string[]; // Array of dates corresponding to the days
}

// Mapping of months to their data
export type YearData = Record<string, MonthData>;

// Flat map for quick lookup of data by date
export interface DateMap {
  [date: string]: {
    score: number; // The aggregated score for that date
    index: number; // Day index within the month
    month: string; // Month name
    data?: DayData; // Original detailed data for the day
  };
}

// Return type for the processed data useMemo
export interface ProcessedData {
  yearData: YearData;
  dateMap: DateMap;
}
