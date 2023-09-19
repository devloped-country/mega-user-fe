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

  const fetchTemplate = async (token) => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

    try {
      const res = await api({
        url,
        headers: {
          ...headers,
          ...token,
        },
      });

      data.value = res.data;
      onSuccess && onSuccess(res);
      isSuccess.value = true;
    } catch (err) {
      throw err;
    }
  };

  const fetchData = async () => {
    try {
      await fetchTemplate(
        {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      );
    } catch (err) {
      if (err.status === 401) {
        try {
          await fetchTemplate({
            Authorization: `Bearer ${localStorage.getItem('refresh')}`,
          });
        } catch (err) {
          throw err;
        }
      }

      isError.ref = true;
      onError && onError(err);

      if (err.status === 401) {
        return router.push({ name: LoginView });
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, isSuccess, isError, fetchData };
}
