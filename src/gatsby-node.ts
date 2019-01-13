/**
 * See documentation here: https://www.gatsbyjs.org/docs/add-custom-webpack-config/
 *
 * @param getConfig
 * @param stage
 * @param actions
 * @param loaders
 * @param rules
 */
exports.onCreateWebpackConfig = ({ getConfig, stage, actions, loaders, rules }) => {
    const config = getConfig()
    const typingsLoaderConfig = [
        loaders.miniCssExtract(),
        loaders.css({ importLoaders: 1}),
        loaders.postCss(),
        {
            loader  : 'typings-for-css-modules-loader',
            options : {
                modules         : true,
                importLoaders   : 1,
                localIndentName : '[path]___[name]__[local]___[hash:base64:5]',
                namedExport     : true,
                camelCase       : true
            }
        }
    ]

    actions.setWebpackConfig({
        module : {
            rules : [
                {
                    test : /\.module\.css$/,
                    use  : typingsLoaderConfig
                },
                {
                    test : /\.module\.scss$/,
                    use  : typingsLoaderConfig
                }
            ]
        }
    })
}
