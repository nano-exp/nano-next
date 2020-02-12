module.exports = {
    webpack(config, option) {
        config.module.rules.push({
            test: /\.html$/,
            use: 'raw-loader',
        })
        return config
    }
}
