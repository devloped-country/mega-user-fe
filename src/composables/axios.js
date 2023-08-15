import axios from '@/api/axios.js';
import { ref } from 'vue';

export async function useAxios(url, config = {}) {
  const data = ref([]);
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const isError = ref(false);

  const { onSuccess, onError, method, headers } = config;

  try {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

    const res = await axios({
      url,
      method,
      headers,
      data: { ...config.data },
    });
    data.value = res.data;
    onSuccess && onSuccess(res);
    isSuccess.value = true;
  } catch (err) {
    isError.ref = true;
    onError && onError(err);
  } finally {
    isLoading.value = false;
  }

  return { data, isLoading, isSuccess, isError };
}
