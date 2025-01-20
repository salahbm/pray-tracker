export interface HeatMapProps {
  data: { [date: string]: { [prayer: string]: boolean } } | null | [];
  color?: ColorProps;
  year?: number;
  onDayClick?: (date: string, dayData: { [prayer: string]: boolean }) => void;
}

export interface OpacityProps {
  opacity: number;
  limit: number;
}

export interface ColorProps {
  theme: string;
  opacity: OpacityProps[];
}
