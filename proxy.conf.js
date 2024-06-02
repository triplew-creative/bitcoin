var defaultTarget = 'http://api.bitcoincharts.com/';
module.exports = [
    {
        context: ['/v1/**', '/api/suggestion*'],
        target: process.env['FAKE_BACKEND']
            ? 'http://localhost:3000' : defaultTarget,
        secure: true,
        changeOrigin: true,
    },
];