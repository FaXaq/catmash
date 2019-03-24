// hack to prevent tests from failing with firebase build
const regex = /firebase\/(app|firestore)/;

module.exports = {
  configureWebpack: {
    externals: ['/node_modules/', function(context, request, callback) {
      // exclude firebase products from being bundled ONLY IN TEST MODE, so they will be loaded using require() at runtime.
      if(regex.test(request) && process.env.NODE_ENV == 'test') {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }]
  }
}