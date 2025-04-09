import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';

const uploadImage = async ({
  imageUri,
  fileExt,
  userId,
  oldPath,
}: {
  imageUri: string;
  fileExt: string;
  userId: string;
  oldPath?: string;
}): Promise<string> => {
  const formData = new FormData();

  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append('avatar', blob);
  formData.append('fileExt', fileExt);
  if (oldPath) formData.append('oldPath', oldPath);

  const result = await agent(`/users/${userId}/avatar`, {
    method: 'POST',
    body: formData,
  });
  return result.data.photo;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [userKeys],
        });
      },
    },
  });
};
