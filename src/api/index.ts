import axios from 'axios';
import { withAbort } from '@/api/helpers/withAbort';
import type { AxiosInstance } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 60000, // cancel if > 1min
});

type AxiosInstanceWrapper = Pick<AxiosInstance, 'get' | 'post' | 'put' | 'delete'>;

const createApi = (axios: AxiosInstance): AxiosInstanceWrapper => {
  return {
    get: (url, config) => withAbort(axiosInstance.get)(url, config),
    post: (url, data, config) => withAbort(axiosInstance.post)(url, data, config),
    put: (url, data, config) => withAbort(axiosInstance.put)(url, data, config),
    delete: (url, config) => withAbort(axiosInstance.delete)(url, config),
  };
};

export default createApi(axiosInstance);
