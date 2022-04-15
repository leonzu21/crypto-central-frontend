export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url, token) {
  let authHeader = null;
  if (token) authHeader = { Authorization: `Bearer ${token}` };
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader },
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function post(url, body, token) {
  let authHeader = null;
  if (token) authHeader = { Authorization: `Bearer ${token}` };
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

async function put(url, body, token) {
  let authHeader = null;
  if (token) authHeader = { Authorization: `Bearer ${token}` };
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url, token) {
  let authHeader = null;
  if (token) authHeader = { Authorization: `Bearer ${token}` };
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader },
  };
  const response = await fetch(url, requestOptions);
  return handleResponse(response);
}

// helper functions

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
