import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.megamega-app.com',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: 'https://api.megamega-app.com',
});

apiClient.interceptors.request.use(
  async function (config) {
    const loginUrl = 'https://mega-user.vercel.app/';
    const joinUrl = 'https://mega-user.vercel.app/join';

    if (location.href === loginUrl || location.href === joinUrl) {
      return config;
    }

    if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
      localStorage.clear();
      location.href = loginUrl;
      return;
    }

    try {
      const res = await fetch('/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Token-Kind': 'access',
        },
      });

      if (res.status === 401) {
        throw new Error();
      }

      return config;
    } catch (err) {
      try {
        const res = await fetch('/auth', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh')}`,
            'Token-Kind': 'refresh',
          },
        }).then((res) => res.json());

        localStorage.setItem('access', res.access);
        if (res.refresh) {
          localStorage.setItem('refresh', res.refresh);
        }

        return config;
      } catch (error) {
        localStorage.clear();
        location.href = loginUrl;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async function (config) {
    const loginUrl = 'https://mega-user.vercel.app/';
    const joinUrl = 'https://mega-user.vercel.app/join';

    if (location.href === loginUrl || location.href === joinUrl) {
      return config;
    }

    if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
      localStorage.clear();
      location.href = loginUrl;
      return;
    }

    try {
      const res = await fetch('/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Token-Kind': 'access',
        },
      });

      if (res.status === 401) {
        throw new Error();
      }

      return config;
    } catch (err) {
      try {
        const res = await fetch('/auth', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh')}`,
            'Token-Kind': 'refresh',
          },
        }).then((res) => res.json());

        localStorage.setItem('access', res.access);
        if (res.refresh) {
          localStorage.setItem('refresh', res.refresh);
        }

        return config;
      } catch (error) {
        localStorage.clear();
        location.href = loginUrl;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
