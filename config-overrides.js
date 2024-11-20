module.exports = function override(config, env) {
  // Add any custom config here
  config.devServer = {
    ...config.devServer,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return config;
}; 