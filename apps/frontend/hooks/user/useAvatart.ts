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

interface UploadResponse {
  photo: string;
  message: string;
}

const uploadImage = async ({
  imageUri,
  fileExt,
  userId,
  oldPath,
}: UploadImageArgs): Promise<UploadResponse> => {
  const formData = new FormData();

  formData.append('avatar', {
    uri: imageUri,
    name: `avatar.${fileExt}`,
    type: `image/${fileExt}`,
  } as any);

  if (oldPath) formData.append('oldPath', oldPath);

  const { data } = await agent(`/users/${userId}/avatar`, {
    method: 'POST',
    body: formData,
  });

  if (!data?.photo) {
    throw new Error('Failed to upload image');
  }

  return data;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    options: {
      onSuccess: async (data) => {
        if (data?.photo) {
          await queryClient.invalidateQueries({
            queryKey: [userKeys],
          });
        }
      },
    },
  });
};
