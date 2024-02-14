// api.js


const BASE_URL = `${process.env.REACT_APP_API_URL}`;
const token = localStorage.getItem('token')

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const callApi = async (endpoint, method = 'GET', data = null) => {
    console.log(token)
    if(token==""){
        window.location.replace(`${process.env.REACT_BASE_URL}`)
    }
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+token
  };

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options);
    let finalResponse = await handleResponse(response)
    console.log('resp', response.response)
    console.log('final', finalResponse)
    if (finalResponse.code=="05") {
        console.log("session expired")
        localStorage.clear()
        window.location.replace(`${process.env.REACT_BASE_URL}`)
    }
    return finalResponse;
  } catch (error) {
    throw new Error('Network error');
  }
};

