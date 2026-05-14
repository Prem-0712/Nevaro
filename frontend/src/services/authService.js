const BASE_URL = "http://localhost:8000";

export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/account/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  return data;
};

export const loginUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/account/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  return { data, status: response.status };
};