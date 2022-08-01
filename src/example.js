const func = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
}
module.exports = {
    func : func
}