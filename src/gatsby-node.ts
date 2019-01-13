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
    actions.setWebpackConfig({
        module : {
            rules : [
                {
                    test : /\.module\.css$/,
                    use  : [
                        loaders.style(),
                        loaders.miniCssExtract(),
                        loaders.css(),
                        loaders.postcss(),
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
                },
                {
                    test : /\.module\.scss$/,
                    use  : [
                        loaders.style(),
                        {
                            loader  : 'typings-for-css-modules-loader',
                            options : {
                                modules         : true,
                                importLoaders   : 1,
                                localIndentName : '[path]___[name]__[local]___[hash:base64:5]',
                                namedExport     : true,
                                camelCase       : true
                            }
                        },
                        loaders.sass()
                    ]
                }
            ]
        }
    })
}
