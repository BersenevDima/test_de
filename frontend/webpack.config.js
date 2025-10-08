const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

/**
 *
 */
module.exports = (env, argv) => {
  const mode = argv.mode;

  return {
    entry: path.join(__dirname, "src", "app.js"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "index.[contenthash].js",
      publicPath: "/test_de/",
      assetModuleFilename: path.join("images", "[name][ext][query]"),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [ "@babel/preset-env" ],
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: "pug-loader",
        },
        {
          test: /\.(pc|c)ss$/i,
          use: [
            mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                url: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "pages", "index.pug"),
        filename: "index.html",
      }),
      new FileManagerPlugin({
        events: {
          onStart: {
            delete: [ "build" ],
          },
        },
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name].[contenthash].css",
      }),
      new StylelintPlugin({
        extensions: [ "css", "pcss" ],
        context: path.resolve(__dirname, "src", "styles"),
        configFile: path.resolve(__dirname, ".stylelintrc.js"),
      }),
      new ESLintPlugin({
        context: path.resolve(__dirname, "src", "js"),
        overrideConfigFile: path.resolve(__dirname, ".eslintrc.js"),
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "src", "fonts"),
            to: "fonts",
          },
          {
            from: path.join(__dirname, "src", "images"),
            to: "images",
          },
        ],
      }),
    ],
    context: __dirname,
    devtool: "source-map",
    devServer: {
      watchFiles: path.join(__dirname, "src"),
      port: 9000,
      hot: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
  };
};