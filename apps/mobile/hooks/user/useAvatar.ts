import { useQueryClient } from '@tanstack/react-query';

import QueryKeys from '@/constants/query-keys';
import agent from '@/lib/agent';
import { User } from '@/types/user';

import useMutation from '../common/useMutation';
import { useAuthStore } from '@/store/auth/auth-session';
interface UploadImageArgs {
  imageUri: string;
  fileExt: string;
  userId: string;
  oldPath?: string;
}

interface PresignResponse {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
}

const uploadImage = async ({
  imageUri,
  fileExt,
  oldPath,
}: UploadImageArgs): Promise<{ image: string; user: User }> => {
  const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;
  const fileName = `avatar-${Date.now()}.${fileExt}`;

  // Step 1: Get presigned URL
  const presign = await agent.post<PresignResponse>(`/files/avatar/presign`, {
    fileName,
    contentType,
  });

  // Step 2: Upload image to S3/R2
  const fileResponse = await fetch(imageUri);
  const fileBlob = await fileResponse.blob();

  const uploadResponse = await fetch(presign.uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: fileBlob,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    console.error('Upload failed:', {
      status: uploadResponse.status,
      statusText: uploadResponse.statusText,
      error: errorText,
    });
    throw new Error(
      `Failed to upload image: ${uploadResponse.status} ${uploadResponse.statusText}`
    );
  }

  // Step 3: Confirm upload and delete old image
  const res = await agent.post<{ image: string; user: User }>(`/files/avatar/confirm`, {
    fileKey: presign.fileKey,
    oldFileKey: oldPath || undefined, // Pass oldPath as oldFileKey
  });

  return res;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: uploadImage,
    options: {
      onSuccess: async data => {
        if (data) {
          setUser({
            ...data.user,
            image: data.image,
            name: data.user.name,
          });
          await queryClient.invalidateQueries({
            queryKey: QueryKeys.users.all,
          });
        }
      },
    },
  });
};
