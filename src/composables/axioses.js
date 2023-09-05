import { api } from '@/api/api.js';
import { ref } from 'vue';

export function useAxioses(fetchers, config = {}) {
  const data = ref();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  const { onSuccess, onError } = config;

  const fetchsData = async () => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

    return await Promise.all(fetchers.map((fetcher) => api(fetcher)));
  };

  fetchsData()
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

  return { data, isLoading, isSuccess, isError };
}
