export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data.message || getDefaultErrorMessage(status);
    const errors = data.errors || null;
    
    return new ApiError(message, status, errors);
  } else if (error.request) {
    // Request made but no response received
    return new ApiError(
      'Unable to connect to the server. Please check your internet connection.',
      0
    );
  } else {
    // Error in request setup
    return new ApiError(
      'An error occurred while setting up the request.',
      0
    );
  }
};

const getDefaultErrorMessage = (status) => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Unauthorized. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 422:
      return 'Validation error. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred.';
  }
}; 