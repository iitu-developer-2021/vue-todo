import { ref } from 'vue';
import type { Ref } from 'vue';

import { apiStatusFactory } from '@/api/consts/apiStatusFactory';
import { apiStatuses } from '@/api/consts/apiStatuses';
import type { ApiStatusValues, ApiStatusKeys } from '@/api/consts/apiStatuses';

type UpperFirstApiStatusKeys = Capitalize<Lowercase<ApiStatusKeys>>;
type ApiStatusFactory<T extends string> = `${T}${UpperFirstApiStatusKeys}`;

const { PENDING, IDLE, SUCCESS, FAILED } = apiStatuses;

interface UseApiConfig<T> {
  defaultData?: T;
  responseAdapter?: (response: any) => any;
  successCallback?: (data: T, passedArgs: any) => void;
  failedCallback?: (e: Error) => void;
}

export const useApi = <T extends string, F = any, D = any>(
  fn: (...args: any) => F,
  apiName: T,
  config: UseApiConfig<D> = {},
) => {
  const { defaultData, responseAdapter, successCallback, failedCallback } = config;
  const data = ref<D | null>(defaultData || null) as Ref<D>;
  const error = ref<Error | null>(null);
  const status = ref<ApiStatusValues>(IDLE);

  const exec = async (...args: any) => {
    try {
      error.value = null;
      status.value = PENDING;
      const response = await fn(...args);
      data.value = typeof responseAdapter === 'function' ? responseAdapter(response) : response;
      successCallback?.(data.value, args);
      status.value = SUCCESS;
    } catch (e) {
      failedCallback?.(e as Error);
      status.value = FAILED;
      error.value = e as Error;
    }
  };

  return {
    error,
    data,
    status,
    exec,
    ...apiStatusFactory<ApiStatusFactory<T>, T>(apiName, status),
  };
};
