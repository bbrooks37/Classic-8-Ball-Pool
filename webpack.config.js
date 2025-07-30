const path = require('path');

module.exports = {
  entry: './src/game.ts', // Or './src/game.ts' if you've done the casing fix
  mode: 'production', // Keep this as 'production' for now, as your npm script overrides it for serving.
                     // If you only ever want development mode when serving, you could change it here,
                     // but keeping it as is and letting the npm script handle it is fine.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // Add this line if it's not already there. Important for dev server asset paths.
  },

  // >>> ADD THIS devServer CONFIGURATION <<<
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Tell dev-server to serve files from the 'dist' folder
    compress: true,                          // Enable gzip compression for everything served
    port: 8080,                              // Specify the port to run on
    open: true,                              // Automatically open the browser
    historyApiFallback: {                    // Fallback to index.html for HTML5 History API (useful for SPAs)
      index: 'index.html'
    }
  }
};