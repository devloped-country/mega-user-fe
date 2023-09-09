import { api } from '@/api/api.js';
import { ref } from 'vue';

export function useFetchs(fetchers, config = {}) {
  const data = ref();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  const { onSuccess, onError } = config;

  const fetchData = async () => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

    return await Promise.all(fetchers.map((fetcher) => api(fetcher)))
      .then((res) => {
        data.value = res.map(({ data }) => data);
        onSuccess && onSuccess(res);
        isSuccess.value = true;
      })
      .catch((err) => {
        isError.ref = true;
        onError && onError(err);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return { data, isLoading, isSuccess, isError, fetchData };
}
