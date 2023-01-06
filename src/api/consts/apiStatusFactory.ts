import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import { apiStatuses } from '@/api/consts/apiStatuses';
import type { ApiStatusValues } from '@/api/consts/apiStatuses';
import type { Ref } from 'vue';

export const apiStatusFactory = <T extends string, K extends string>(
  apiName: K,
  status: Ref<ApiStatusValues>,
): Record<T, ComputedRef<boolean>> => {
  const apiStatusComputed: Record<T, ComputedRef<boolean>> | Record<string, ComputedRef<boolean>> = {};

  Object.entries(apiStatuses).forEach(([apiStatusKey, apiStatusValue]) => {
    const upperFirstLetter = apiStatusKey[0].toUpperCase();
    const otherLetters = apiStatusKey.slice(1).toLowerCase();
    const statusKey = upperFirstLetter + otherLetters;
    const apiStatusComputedKey = apiName + statusKey;
    apiStatusComputed[apiStatusComputedKey as T] = computed(() => {
      return apiStatusValue === status.value;
    });
  });

  return apiStatusComputed;
};
