import { apiStatuses } from '@/api/consts/apiStatuses';
import type { ApiStatusValues } from '@/api/consts/apiStatuses';
import { ref } from 'vue';

const { IDLE, SUCCESS, FAILED, PENDING } = apiStatuses;
export const useAsync = (fn: (...args: any) => Promise<any>) => {
  const status = ref<ApiStatusValues>(IDLE);

  const wrappedFn = async (...args: any) => {
    try {
      status.value = PENDING;
      const response = await fn(...args);
      status.value = SUCCESS;

      return response;
    } catch (e) {
      status.value = FAILED;
    }
  };

  return {
    status,
    wrappedFn,
  };
};
