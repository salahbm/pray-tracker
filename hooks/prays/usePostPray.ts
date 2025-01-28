import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import useMutation from '../common/useMutation';
import { praysListKeys, usersListKey } from '@/constants/query-keys';
import { agent } from '@/lib/fetch';
import { fireToast } from '@/providers/toaster';
import { ErrorData, IResponse } from '@/types/api';
import { IPrays } from '@/types/prays';

type PrayData = {
  id: string;
  date: Date;
  fajr?: number;
  dhuhr?: number;
  asr?: number;
  maghrib?: number;
  isha?: number;
  tahajjud?: number;
};

const createPray = async (data: PrayData): Promise<IResponse<IPrays>> => {
  const response = await agent(`/prays/${data.id}/post`, {
    method: 'POST',
    body: JSON.stringify({
      userId: data.id,
      date: format(data.date, 'yyyy-MM-dd'),
      fajr: data.fajr,
      dhuhr: data.dhuhr,
      asr: data.asr,
      maghrib: data.maghrib,
      isha: data.isha,
      tahajjud: data.tahajjud,
    }),
  });
  return response;
};

export const useCreatePray = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPray,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [praysListKeys, usersListKey],
        });
      },
      onError: (error: ErrorData) => {
        fireToast.error(error.message);
      },
    },
  });
};
