import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Keyboard } from 'react-native';
import { BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useTranslation } from 'react-i18next';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { MapPin, Search, MapPinned } from '@/components/shared/icons';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { useLocationStore } from '@/store/use-location';
import { Input } from '../ui/input';
import ScrollBottomSheet from './bottom-sheet/scroll-sheet';

interface LocationSelectorProps {
  /**
   * Ref to control the bottom sheet from parent
   */
  sheetRef: React.RefObject<BottomSheetModal>;

  /**
   * Optional callback when location is selected
   */
  onLocationSelected?: (city: string, country: string) => void;
}

const useDebounce = (value: string, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

/**
 * Global LocationSelector Component
 *
 * Features:
 * - Search for cities using OpenStreetMap Nominatim API
 * - Use current location button with GPS
 * - Handles non-English characters by transliterating to English
 * - Beautiful bottom sheet UI
 *
 * Usage:
 * ```tsx
 * const sheetRef = useRef<BottomSheet>(null);
 *
 * <LocationSelector sheetRef={sheetRef} />
 *
 * // Open from anywhere:
 * sheetRef.current?.snapToIndex(0);
 * ```
 */
export const LocationSelector: React.FC<LocationSelectorProps> = ({
  sheetRef,
  onLocationSelected,
}) => {
  const { t } = useTranslation();
  const { setLocation, initLocation, isLoadingLocation } = useLocationStore();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery);

  const { data: locationResults = [], isFetching: isSearching } = useQuery({
    queryKey: ['locationSearch', { debouncedSearch }],
    queryFn: async () => {
      if (debouncedSearch.length < 3) return [];

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${encodeURIComponent(
          debouncedSearch
        )}`,
        {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'NoorPrayTracker/1.0',
          },
        }
      );

      if (!res.ok) {
        console.warn('Location search failed:', res.status);
        return [];
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        console.warn('Non-JSON response from location API');
        return [];
      }

      return res.json();
    },
    enabled: debouncedSearch.length >= 3,
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  const handleSelectLocation = (item: any) => {
    const cityName = item.address?.city || item.address?.town || item.address?.village || item.name;
    const countryName = item.address?.country || '';

    setLocation(cityName, countryName);
    setSearchQuery('');
    sheetRef.current?.close();
    Keyboard.dismiss();

    onLocationSelected?.(cityName, countryName);
  };

  const handleUseCurrentLocation = async () => {
    await initLocation();
    sheetRef.current?.close();
    Keyboard.dismiss();
  };

  return (
    <ScrollBottomSheet ref={sheetRef} snapPoints={['85%', '100%']}>
      <View className="py-8">
        <Text className="text-xl font-bold mb-4 text-center text-foreground">
          {t('location.selector.title')}
        </Text>

        {/* Current Location Button */}
        <Button
          onPress={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className="mb-4 flex-row items-center justify-center gap-2"
        >
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <MapPinned size={18} className="text-primary-foreground" />
          )}
          <Text className="text-primary-foreground font-semibold">
            {isLoadingLocation
              ? t('location.selector.detecting')
              : t('location.selector.useCurrentLocation')}
          </Text>
        </Button>

        {/* Search Input */}
        <View className="relative mb-2">
          <View className="absolute left-4 top-4 z-10">
            <Search size={18} className="text-muted-foreground" />
          </View>
          <BottomSheetTextInput
            placeholder={t('location.selector.searchPlaceholder')}
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ paddingLeft: 44 }}
            className="h-12 rounded-xl bg-muted/30 border border-border text-foreground pr-4"
          />
          {isSearching && <ActivityIndicator className="absolute right-4 top-3.5" />}
        </View>

        {/* Search hint */}
        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <Text className="text-xs text-muted-foreground mb-2 px-1">
            {t('location.selector.searchHint')}
          </Text>
        )}

        {/* Results List */}
        <View className="pt-3 pb-8">
          {locationResults.map((item: any, index: number) => (
            <PressableBounce
              key={`${item.place_id ?? item.osm_id ?? index}`}
              onPress={() => handleSelectLocation(item)}
              className="mb-2 p-4 rounded-xl flex-row items-center gap-3 bg-muted/30 border border-border/50 active:bg-muted"
            >
              <View className="w-8 h-8 rounded-full bg-muted items-center justify-center">
                <MapPin size={16} className="text-foreground/70" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-base text-foreground">
                  {item.address?.city || item.address?.town || item.address?.village || item.name}
                </Text>
                <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                  {[item.address?.state, item.address?.country].filter(Boolean).join(', ')}
                </Text>
              </View>
            </PressableBounce>
          ))}

          {locationResults.length === 0 && (
            <View className="items-center mt-10 opacity-50">
              <MapPin size={48} className="text-muted-foreground mb-3" />
              <Text className="text-sm text-muted-foreground text-center">
                {searchQuery.length >= 3
                  ? t('location.selector.noResults')
                  : t('location.selector.emptyState')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollBottomSheet>
  );
};
