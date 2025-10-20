import { View } from 'react-native';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Edit2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/defaults/theme';
import { useUpdateGroup } from '@/hooks/friends/useUpdateGroup';
import { useAuthStore } from '@/store/auth/auth-session';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

interface EditGroupSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const EditGroupSheet: React.FC<EditGroupSheetProps> = ({ sheetRef }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const { groupName, selectedGroup, setGroupName, setSelectedGroup } = useFriendsBottomSheetStore();

  const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup();

  const handleUpdateGroup = async () => {
    if (!groupName.trim() || !selectedGroup || !user?.id) return;

    await updateGroup({
      groupId: selectedGroup.id,
      name: groupName.trim(),
      userId: user.id,
    }).then(() => {
      setGroupName('');
      setSelectedGroup(null);
      sheetRef.current?.close();
    });
  };

  return (
    <CustomBottomSheet sheetRef={sheetRef} snapPoints={['50%']}>
      <View className="gap-4 pb-8">
        <View className="items-center mb-2">
          <View className="bg-primary/10 p-4 rounded-full mb-3">
            <Edit2 size={32} color={colors['--primary']} />
          </View>
          <Text className="text-2xl font-bold text-center">
            {t('Friends.Groups.EditTitle')}
          </Text>
          <Text className="text-sm text-muted-foreground text-center mt-2 px-4">
            {t('Friends.Groups.EditDescription')}
          </Text>
        </View>

        <BottomSheetTextInput
          placeholder={t('Friends.Groups.GroupNamePlaceholder')}
          value={groupName}
          onChangeText={setGroupName}
          className="web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground  web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
        />

        <View className="flex-row gap-3 mt-2">
          <Button
            variant="outline"
            onPress={() => {
              setGroupName('');
              setSelectedGroup(null);
              sheetRef.current?.close();
            }}
            className="flex-1"
          >
            <Text>{t('Commons.Cancel')}</Text>
          </Button>
          <Button
            onPress={handleUpdateGroup}
            disabled={isUpdating || !groupName.trim()}
            className="flex-1"
          >
            <Text>{isUpdating ? t('Commons.Updating') : t('Commons.Update')}</Text>
          </Button>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default EditGroupSheet;
