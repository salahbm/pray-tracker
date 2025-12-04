import BottomSheet from '@gorhom/bottom-sheet';
import { Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useDeleteGroup } from '@/hooks/friends/group/useDeleteGroup';
import { useAuthStore } from '@/store/auth/auth-session';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import { useThemeStore } from '@/store/defaults/theme';

interface DeleteGroupSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const DeleteGroupSheet: React.FC<DeleteGroupSheetProps> = ({ sheetRef }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const { selectedGroup, setSelectedGroup } = useFriendsBottomSheetStore();

  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const handleDeleteGroup = async () => {
    if (!selectedGroup || !user?.id) return;

    await deleteGroup({
      groupId: selectedGroup.id,
      userId: user.id,
    }).then(() => {
      setSelectedGroup(null);
      sheetRef.current?.close();
    });
  };

  return (
    <CustomBottomSheet sheetRef={sheetRef} snapPoints={['40%']}>
      <View className="gap-4 pb-8">
        <View className="items-center mb-2">
          <View className="bg-destructive/10 p-4 rounded-full mb-3">
            <Trash2 size={32} color={colors['--destructive']} />
          </View>
          <Text className="text-2xl font-bold text-center">{t('friends.groups.deleteTitle')}</Text>
          <Text className="text-sm text-muted-foreground text-center mt-2 px-4">
            {t('friends.groups.deleteDescription', { name: selectedGroup?.name })}
          </Text>
        </View>

        <View className="flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onPress={() => {
              setSelectedGroup(null);
              sheetRef.current?.close();
            }}
            className="flex-1"
          >
            <Text>{t('common.actions.cancel')}</Text>
          </Button>
          <Button
            variant="destructive"
            onPress={handleDeleteGroup}
            disabled={isDeleting}
            className="flex-1"
          >
            <Text>{isDeleting ? t('common.actions.deleting') : t('common.actions.delete')}</Text>
          </Button>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default DeleteGroupSheet;
