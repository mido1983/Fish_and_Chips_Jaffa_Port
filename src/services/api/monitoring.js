export const apiMonitoring = {
  requestStartTime: null,

  onRequest(config) {
    this.requestStartTime = performance.now();
    
    // Log request details in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`API Request: ${config.method.toUpperCase()} ${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Params:', config.params);
      console.log('Data:', config.data);
      console.groupEnd();
    }
  },

  onResponse(response) {
    const duration = performance.now() - this.requestStartTime;
    
    // Log response details in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`API Response: ${response.config.method.toUpperCase()} ${response.config.url}`);
      console.log('Status:', response.status);
      console.log('Duration:', `${duration.toFixed(2)}ms`);
      console.log('Data:', response.data);
      console.groupEnd();
    }

    // Send metrics to monitoring service
    this.sendMetrics({
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      duration,
    });
  },

  onError(error) {
    const duration = performance.now() - this.requestStartTime;
    
    // Log error details in development
    if (process.env.NODE_ENV === 'development') {
      console.group('API Error');
      console.error('URL:', error.config?.url);
      console.error('Method:', error.config?.method);
      console.error('Status:', error.response?.status);
      console.error('Duration:', `${duration.toFixed(2)}ms`);
      console.error('Error:', error);
      console.groupEnd();
    }

    // Send error metrics to monitoring service
    this.sendMetrics({
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      duration,
      error: true,
    });
  },

  sendMetrics(metrics) {
    // Implementation would depend on your monitoring service
    // Example using Google Analytics
    if (window.gtag) {
      gtag('event', 'api_request', {
        event_category: 'API',
        event_label: `${metrics.method} ${metrics.url}`,
        value: Math.round(metrics.duration),
        status: metrics.status,
        error: metrics.error || false,
      });
    }
  },
}; 