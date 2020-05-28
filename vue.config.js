module.exports = {
    publicPath: './',
    outputDir: 'dist',
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
            }
        }
    }
}