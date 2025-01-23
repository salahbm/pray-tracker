// import { format } from 'date-fns';

// import { DayData } from '@/components/shared/heat-map/heat';
// import { IResponseArray } from '@/types/api';
// import { IPrays } from '@/types/prays';

// export const transformPraysToDayData = (
//   data: IResponseArray<IPrays>, // Adjusted for array of IPrays
// ): Record<string, DayData> => {
//   // If `data` itself is an array (no `data.data` property)
//   const praysArray = Array.isArray(data) ? data : data.data;

//   // Validate the array
//   if (!Array.isArray(praysArray) || praysArray.length === 0) {
//     return {};
//   }

//   // Transform each item in the array
//   return praysArray.reduce((result, item) => {
//     const formattedDate = format(new Date(item.date), 'yyyy-MM-dd');
//     result[formattedDate] = {
//       fajr: item.fajr,
//       dhuhr: item.dhuhr,
//       asr: item.asr,
//       maghrib: item.maghrib,
//       isha: item.isha,
//       tahajjud: item.tahajjud,
//     };

//     return result;
//   })
// };
