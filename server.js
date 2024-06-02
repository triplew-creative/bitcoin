const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('apps/fake-backend/src/json-server-backend/db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
//server.get('/api/suggestion', (req, res) => res.status(500).jsonp({}));
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
        if (buyObj) {
            let result = server.defaultConfiguration;

            if (result) {
                res.status(200).jsonp(result);
            }
        } else {
            res.status(400).jsonp({
                error: "No valid userId"
            });
        }
    }
});