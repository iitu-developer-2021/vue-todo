import { ref } from 'vue';
import type { Ref } from 'vue';

import { apiStatusFactory } from '@/api/consts/apiStatusFactory';
import { apiStatuses } from '@/api/consts/apiStatuses';
import type { ApiStatusValues, ApiStatusKeys } from '@/api/consts/apiStatuses';
import type { CustomFunction } from '@/types';

type UpperFirstApiStatusKeys = Capitalize<Lowercase<ApiStatusKeys>>;
type ApiStatusFactory<T extends string> = `${T}${UpperFirstApiStatusKeys}`;

const { PENDING, IDLE, SUCCESS, FAILED } = apiStatuses;

export const useApi = <Type extends string, DataType = any>(
  apiName: Type,
  fn: CustomFunction<any, Promise<DataType>>,
  config: { defaultData?: DataType; responseAdapter?: CustomFunction<any, DataType>; throwError?: boolean } = {},
) => {
  const { defaultData, responseAdapter, throwError = false } = config;
  const data = ref<DataType | null>(defaultData || null) as Ref<DataType>;
  const error = ref<Error | null>(null);
  const status = ref<ApiStatusValues>(IDLE);

  const exec = async (...args: any) => {
    try {
      error.value = null;
      status.value = PENDING;
      const response = await fn(...args);
      data.value = typeof responseAdapter === 'function' ? responseAdapter(response) : response;
      status.value = SUCCESS;
    } catch (e) {
      if (throwError) throw e;
      status.value = FAILED;
      error.value = e as Error;
    }
  };

  return {
    error,
    data,
    status,
    exec,
    ...apiStatusFactory<ApiStatusFactory<Type>, Type>(apiName, status),
  };
};
