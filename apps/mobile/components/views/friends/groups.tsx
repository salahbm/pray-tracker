import { router } from 'expo-router';
import { FolderPlus, Users, ChevronRight, Trash2, Edit2 } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import NoData from '@/components/shared/no-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useCreateGroup } from '@/hooks/friends/useCreateGroup';
import { useDeleteGroup } from '@/hooks/friends/useDeleteGroup';
import { useGetGroups } from '@/hooks/friends/useGetGroups';
import { useUpdateGroup } from '@/hooks/friends/useUpdateGroup';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import Modal from '@/components/shared/modal';

const FriendsGroups = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const { data: groups, isLoading, refetch } = useGetGroups(user?.id ?? '');
  const { mutateAsync: createGroup, isPending: isCreating } = useCreateGroup();
  const { mutateAsync: updateGroup, isPending: isUpdating } = useUpdateGroup();
  const { mutateAsync: deleteGroup, isPending: isDeleting } = useDeleteGroup();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<{ id: string; name: string } | null>(null);

  const handleCreateGroup = async () => {
    if (!groupName.trim() || !user?.id) return;

    await createGroup({
      userId: user.id,
      name: groupName.trim(),
    });

    setGroupName('');
    setShowCreateDialog(false);
  };

  const handleUpdateGroup = async () => {
    if (!groupName.trim() || !selectedGroup || !user?.id) return;

    await updateGroup({
      groupId: selectedGroup.id,
      name: groupName.trim(),
      userId: user.id,
    });

    setGroupName('');
    setSelectedGroup(null);
    setShowEditDialog(false);
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup || !user?.id) return;

    await deleteGroup({
      groupId: selectedGroup.id,
      userId: user.id,
    });

    setSelectedGroup(null);
    setShowDeleteDialog(false);
  };

  const openEditDialog = (group: { id: string; name: string }) => {
    setSelectedGroup(group);
    setGroupName(group.name);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (group: { id: string; name: string }) => {
    setSelectedGroup(group);
    setShowDeleteDialog(true);
  };

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors['--primary']}
          />
        }
        contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">{t('Friends.Groups.Title')}</Text>
          <View className="flex-row gap-2">
            <Button variant="outline" size="icon" onPress={() => setShowCreateDialog(true)}>
              <FolderPlus size={20} color={colors['--foreground']} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onPress={() => router.push('/(screens)/friends/all-friends')}
            >
              <Users size={20} color={colors['--foreground']} />
            </Button>
          </View>
        </View>

        {/* Groups List */}
        {isLoading ? (
          <Loader visible className="mt-[100%] bg-transparent" />
        ) : groups && groups.length > 0 ? (
          <View className="gap-3">
            {groups.map(group => (
              <TouchableOpacity
                key={group.id}
                onPress={() =>
                  router.push({
                    pathname: '/(screens)/friends/group-details',
                    params: { groupId: group.id, groupName: group.name },
                  })
                }
                className="bg-card border border-border rounded-lg p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-2">
                      <Text className="text-lg font-semibold">{group.name}</Text>
                      <View className="bg-primary/20 px-2 py-1 rounded-full">
                        <Text className="text-xs text-primary font-medium">
                          {group.memberCount} {t('Friends.Groups.Members')}
                        </Text>
                      </View>
                    </View>

                    {/* Member Avatars Preview */}
                    {group.members.length > 0 && (
                      <View className="flex-row items-center gap-1">
                        {group.members.slice(0, 3).map((member, index) => (
                          <Image
                            key={member.id}
                            source={{ uri: member.photo }}
                            className={cn(
                              'size-8 rounded-full bg-muted border-2 border-card',
                              index > 0 && '-ml-2'
                            )}
                            defaultSource={FRIENDS.guest}
                          />
                        ))}
                        {group.memberCount > 3 && (
                          <View className="size-8 rounded-full bg-muted border-2 border-card -ml-2 items-center justify-center">
                            <Text className="text-xs text-muted-foreground">
                              +{group.memberCount - 3}
                            </Text>
                          </View>
                        )}
                      </View>
                    )}
                  </View>

                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                      onPress={e => {
                        e.stopPropagation();
                        openEditDialog({ id: group.id, name: group.name });
                      }}
                      className="p-2"
                    >
                      <Edit2 size={18} color={colors['--muted-foreground']} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={e => {
                        e.stopPropagation();
                        openDeleteDialog({ id: group.id, name: group.name });
                      }}
                      className="p-2"
                    >
                      <Trash2 size={18} color={colors['--destructive']} />
                    </TouchableOpacity>
                    <ChevronRight size={20} color={colors['--muted-foreground']} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <NoData title={t('Friends.Groups.NoGroups')} className="mt-[45%]" />
        )}
      </ScrollView>

      {/* Create Group Dialog */}
      <Modal visible={showCreateDialog} onRequestClose={() => setShowCreateDialog(false)}>
        <Text className="text-lg font-bold">{t('Friends.Groups.CreateTitle')}</Text>
        <Text className="text-sm text-muted-foreground">
          {t('Friends.Groups.CreateDescription')}
        </Text>
        <Input
          placeholder={t('Friends.Groups.GroupNamePlaceholder')}
          value={groupName}
          onChangeText={setGroupName}
          autoFocus
        />
        <View className="flex-row gap-2">
          <Button variant="outline" onPress={() => setShowCreateDialog(false)}>
            <Text>{t('Commons.Cancel')}</Text>
          </Button>
          <Button onPress={handleCreateGroup} disabled={isCreating || !groupName.trim()}>
            <Text>{t('Commons.Create')}</Text>
          </Button>
        </View>
      </Modal>

      {/* Edit Group Dialog */}
      <Modal visible={showEditDialog} onRequestClose={() => setShowEditDialog(false)}>
        <Text className="text-lg font-bold">{t('Friends.Groups.EditTitle')}</Text>
        <Text className="text-sm text-muted-foreground">{t('Friends.Groups.EditDescription')}</Text>
        <Input
          placeholder={t('Friends.Groups.GroupNamePlaceholder')}
          value={groupName}
          onChangeText={setGroupName}
          autoFocus
        />
        <View className="flex-row gap-2">
          <Button variant="outline" onPress={() => setShowEditDialog(false)}>
            <Text>{t('Commons.Cancel')}</Text>
          </Button>
          <Button onPress={handleUpdateGroup} disabled={isUpdating || !groupName.trim()}>
            <Text>{t('Commons.Update')}</Text>
          </Button>
        </View>
      </Modal>

      {/* Delete Group Dialog */}
      <Modal visible={showDeleteDialog} onRequestClose={() => setShowDeleteDialog(false)}>
        <Text className="text-lg font-bold">{t('Friends.Groups.DeleteTitle')}</Text>
        <Text className="text-sm text-muted-foreground">
          {t('Friends.Groups.DeleteDescription', { name: selectedGroup?.name })}
        </Text>
        <View className="flex-row gap-2">
          <Button variant="outline" onPress={() => setShowDeleteDialog(false)}>
            <Text>{t('Commons.Cancel')}</Text>
          </Button>
          <Button variant="destructive" onPress={handleDeleteGroup} disabled={isDeleting}>
            <Text>{t('Commons.Delete')}</Text>
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default FriendsGroups;
