import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API3}`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API3}`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async function (config) {
    const loginUrl = `${import.meta.env.VITE_API2}/`;
    const joinUrl = `${import.meta.env.VITE_API2}/join`;

    if (location.href === loginUrl || location.href === joinUrl) {
      return config;
    }

    if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
      localStorage.clear();
      location.href = loginUrl;
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API3}/auth`, {
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
        const res = await fetch(`${import.meta.env.VITE_API3}/auth`, {
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
    const loginUrl = `${import.meta.env.VITE_API2}/`;
    const joinUrl = `${import.meta.env.VITE_API2}/join`;

    if (location.href === loginUrl || location.href === joinUrl) {
      return config;
    }

    if (!localStorage.getItem('access') || !localStorage.getItem('refresh')) {
      localStorage.clear();
      location.href = loginUrl;
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API3}/auth`, {
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
        const res = await fetch(`${import.meta.env.VITE_API3}/auth`, {
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
        console.log('!!');
        // localStorage.clear();
        // location.href = loginUrl;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
