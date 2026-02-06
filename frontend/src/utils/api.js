import { API_BASE_URL, ERROR_MESSAGES } from '../constants';

class APIError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new APIError(
      ERROR_MESSAGES.NETWORK_ERROR,
      response.status,
      null
    );
  }

  const data = await response.json();
  
  if (data.error) {
    throw new APIError(
      data.message || ERROR_MESSAGES.GENERIC_ERROR,
      data.statusCode || 500,
      data
    );
  }

  return data;
};

const buildURL = (params = {}) => {
  const cleanParams = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
  const queryString = new URLSearchParams(cleanParams).toString();
  return `${API_BASE_URL}${queryString ? '?' + queryString : ''}`;
};

export const api = {
  async getMembers(params = {}, signal = null) {
    try {
      const url = buildURL(params);
      const options = { method: 'GET' };
      
      if (signal) {
        options.signal = signal;
      }
      
      const response = await fetch(url, options);
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }
      
      if (error instanceof APIError) {
        throw error;
      }
      
      throw new APIError(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        null
      );
    }
  },

  async getMemberById(id, signal = null) {
    if (!id) {
      throw new APIError(ERROR_MESSAGES.NOT_FOUND, 404, null);
    }

    try {
      const url = buildURL({ id });
      const options = { method: 'GET' };
      
      if (signal) {
        options.signal = signal;
      }
      
      const response = await fetch(url, options);
      return await handleResponse(response);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }
      
      if (error instanceof APIError) {
        throw error;
      }
      
      throw new APIError(
        ERROR_MESSAGES.NETWORK_ERROR,
        0,
        null
      );
    }
  }
};

export { APIError };
