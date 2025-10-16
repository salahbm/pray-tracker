import { useQueryClient } from '@tanstack/react-query';

import useMutation from '../common/useMutation';
import { userKeys } from '@/constants/query-keys';
import { agent } from '@/lib/agent';
interface UploadImageArgs {
  imageUri: string;
  fileExt: string;
  userId: string;
  oldPath?: string;
}

const uploadImage = async ({
  imageUri,
  fileExt,
  userId,
  oldPath,
}: UploadImageArgs): Promise<{ photo: string }> => {
  const formData = new FormData();

  formData.append('avatar', {
    uri: imageUri,
    name: `avatar.${fileExt}`,
    type: `image/${fileExt}`,
  } as any);

  formData.append('fileExt', fileExt);
  if (oldPath) formData.append('oldPath', oldPath);

  const res = await agent(`/users/${userId}/avatar`, {
    method: 'POST',
    body: formData,
  });

  return res.data;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    options: {
      onSuccess: async (data) => {
        if (data) {
          await queryClient.invalidateQueries({
            queryKey: [userKeys],
          });
        }
      },
    },
  });
};
