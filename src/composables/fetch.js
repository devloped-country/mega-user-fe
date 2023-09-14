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

  const fetchTemplate = async (token, url) => {
    isLoading.value = true;
    isSuccess.value = false;
    isError.value = false;

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
  };

  const fetchData = async (url) => {
    try {
      fetchTemplate(
        {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        url
      );
    } catch (err) {
      if (err.status === 401) {
        try {
          fetchTemplate({
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
