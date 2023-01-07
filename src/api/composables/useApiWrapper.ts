import { ref } from 'vue';

interface UseApiConfig<K, F> {
  responseAdapter?: F;
  successCallback?: (data: K, passedArgs: any) => void;
  failedCallback?: (e: Error) => void;
}

export const useApiWrapper = <T extends (...args: any) => Promise<any>, F extends (response: any) => any, K>(
  fn: T,
  config: UseApiConfig<K, F> = {},
) => {
  const { responseAdapter, successCallback, failedCallback } = config;
  const loading = ref(false);

  const exec = async (...args: any) => {
    try {
      loading.value = true;
      const response = await fn(...args);
      const data = typeof responseAdapter === 'function' ? responseAdapter(response) : response;
      successCallback?.(data, args);
    } catch (e) {
      failedCallback?.(e as Error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    exec,
  };
};
