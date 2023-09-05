import { api } from '@/api/api.js';
import { ref } from 'vue';

export function useMutation(url, config = {}) {
  const data = ref();
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  const { onSuccess, onError, method, headers } = config;

  const mutate = async (param) => {
    try {
      isLoading.value = true;
      isSuccess.value = false;
      isError.value = false;

      const res = await api({
        url,
        method,
        headers,
        data: param,
      });
      data.value = res.data;
      onSuccess && onSuccess(res);
      isSuccess.value = true;
    } catch (err) {
      isError.value = true;
      onError && onError(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { mutate, data, isLoading, isError, isSuccess };
}
