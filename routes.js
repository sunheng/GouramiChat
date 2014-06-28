module.exports = function (app) {
  app.get('/', function(req, res) {
    res.sendfile('views/index.html');
  });

  app.get('/chatroom/:room', function(req, res) {
    res.sendfile('views/chatroom.html');
  });
};
