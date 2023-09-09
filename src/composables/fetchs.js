import { api } from '@/api/api.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useFetchs(fetchers, config = {}) {
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

    const res = await Promise.all(
      fetchers.map((fetcher) =>
        api({
          url: fetcher,
          headers: {
            ...headers,
            ...token,
          },
        })
      )
    );

    data.value = res.map(({ data }) => data);
    onSuccess && onSuccess(res);
    isSuccess.value = true;
  };

  const fetchData = async () => {
    try {
      fetchTemplate({
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      });
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
