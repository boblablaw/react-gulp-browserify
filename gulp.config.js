module.exports = function() {
  var client = './src/client/';
  var clientApp = client + 'app/';
  var config = {
    HTML: 'src/index.html',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: './src/js/App.jsx'
  };
  return config;
};