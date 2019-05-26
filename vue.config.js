module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                '^/api': ''
            }
        }
    }
}
}