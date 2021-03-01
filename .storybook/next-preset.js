module.exports = {
  webpackFinal: (baseConfig) => {
    baseConfig.module.rules.push({
      test: /\.(s*)css$/,
      loaders: [
        require.resolve("style-loader"),
        require.resolve("css-loader"),
        require.resolve("next/dist/compiled/sass-loader"),
      ],
      /**
       * In case we need global sass styles
       */
      // include: path.resolve(__dirname, 'path-to-global.scss'),
    });

    return baseConfig;
  },
};
