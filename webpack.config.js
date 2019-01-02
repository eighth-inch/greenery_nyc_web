module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: `${__dirname}/public`,
      filename: 'main.js',
    },
     module: {
       rules: [
         {
           test: /\.js$/,
           loader: 'babel-loader',
           options: {
            presets: ["es2015", "react"]
          },
           exclude: /node_modules/
         }
       ]
     }
   };