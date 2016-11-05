import 'whatwg-fetch';

const apiFetch = (url, { method, body }) =>
  fetch(`api/${url}`, {
    headers: {
      Accept: 'application/json',
      Authorization: localStorage.token && `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(body)
  }).then(response =>
    response.json().then((json) => {
      if (response.ok) {
        return json;
      }

      return Promise.reject(json);
    })
  );

const del = (url) => apiFetch(url, { method: 'DELETE' });
const get = (url) => apiFetch(url, { method: 'GET' });
const post = (url, body) => apiFetch(url, { method: 'POST', body });
const put = (url, body) => apiFetch(url, { method: 'PUT', body });

export {
  del,
  get,
  post,
  put,
};
