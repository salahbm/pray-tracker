import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import useMutation from '../common/useMutation';

import { praysListKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
import { IResponse } from '@/types/api';
import { IPrays } from '@/types/prays';

type PrayData = {
  id: string;
  date: Date;
  fajr?: number;
  dhuhr?: number;
  asr?: number;
  maghrib?: number;
  isha?: number;
  nafl?: number;
};

const upsertPrayer = async (data: PrayData): Promise<IResponse<IPrays>> => {
  const response = await agent('/prayers', {
    method: 'POST',
    body: JSON.stringify({
      userId: data.id,
      date: format(data.date, 'yyyy-MM-dd'),
      fajr: data.fajr,
      dhuhr: data.dhuhr,
      asr: data.asr,
      maghrib: data.maghrib,
      isha: data.isha,
      nafl: data.nafl,
    }),
  });
  return response;
};

export const useCreatePray = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertPrayer,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [praysListKeys],
        });
      },
    },
  });
};
