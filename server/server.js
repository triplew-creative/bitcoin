const jsonServer = require('json-server');
const middlewares = jsonServer.defaults();
const server = jsonServer.create();
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(jsonServer.rewriter({
    '/api/*': '$1'
})
);
// Use default router9
server.listen(3000, () => {
    console.log('Fake-Backend Server is running');
});
server.post('/buy', (req, res) => {
    if (req.method === 'POST') {
        const buyObj = req.body;
        console.log('buyObj', buyObj);
        if (buyObj) {
            let result = server.defaultConfiguration;
            console.log('result', result);

            if (result) {
                res.status(200).jsonp(result);
            }
        }
    }
});