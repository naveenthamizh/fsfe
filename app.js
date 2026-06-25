const http = require("http");

http
  .createServer(function (req, res) {
    res.write("FSFE");
    res.end();
  })
  .listen(3000);

console.log("Server is listening on poer 3000");
