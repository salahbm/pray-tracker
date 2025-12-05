import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { FolderPlus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCreateGroup } from '@/hooks/friends/group/useCreateGroup';
import { useAuthStore } from '@/store/auth/auth-session';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import { useThemeStore } from '@/store/defaults/theme';

interface CreateGroupSheetProps {
  sheetRef: React.RefObject<BottomSheet | null>;
}

const CreateGroupSheet: React.FC<CreateGroupSheetProps> = ({ sheetRef }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { user } = useAuthStore();
  const { groupName, setGroupName } = useFriendsBottomSheetStore();

  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user?.id) return;

    await createGroup({
      userId: user.id,
      name: groupName.trim(),
    }).then(() => {
      setGroupName('');
      Keyboard.dismiss();
      sheetRef.current?.close();
    });
  };

  return (
    <CustomBottomSheet sheetRef={sheetRef} snapPoints={['50%']}>
      <View className="gap-4 pb-8">
        <View className="items-center mb-2">
          <View className="bg-primary/10 p-4 rounded-full mb-3">
            <FolderPlus size={32} color={colors['--primary']} />
          </View>
          <Text className="text-2xl font-bold text-center">{t('friends.groups.createTitle')}</Text>
          <Text className="text-sm text-muted-foreground text-center mt-2 px-4">
            {t('friends.groups.createDescription')}
          </Text>
        </View>

        <BottomSheetTextInput
          placeholder={t('friends.groups.groupNamePlaceholder')}
          value={groupName}
          onChangeText={setGroupName}
          placeholderTextColor={colors['--muted-foreground']}
          className="web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground  web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
        />

        <View className="flex-row gap-3 mt-2">
          <Button
            variant="outline"
            onPress={() => {
              setGroupName('');
              sheetRef.current?.close();
            }}
            className="flex-1"
          >
            <Text>{t('common.actions.cancel')}</Text>
          </Button>
          <Button
            onPress={handleCreateGroup}
            disabled={isCreating || !groupName.trim()}
            className="flex-1"
          >
            <Text>{isCreating ? t('common.actions.creating') : t('common.actions.create')}</Text>
          </Button>
        </View>
      </View>
    </CustomBottomSheet>
  );
};

export default CreateGroupSheet;
