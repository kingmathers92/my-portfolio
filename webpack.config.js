const webpack = require("webpack");

module.exports = {
  // other Webpack configuration options...
  resolve: {
    fallback: {
      querystring: require.resolve("querystring-es3"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
