import { api } from '@/api/api.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useFetch(url, config = {}) {
  const data = ref();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);
  const router = useRouter();

  const { onSuccess, onError, headers } = config;

  const fetchData = async (params) => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

    try {
      const res = await api({
        url,
        headers: {
          ...headers,
        },
        params,
      });

      data.value = res.data;
      onSuccess && onSuccess(res);
      isSuccess.value = true;
    } catch (err) {
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, isSuccess, isError, fetchData };
}
