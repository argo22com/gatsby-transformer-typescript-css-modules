const CSS_PATTERN = /\.css$/
const MODULE_CSS_PATTERN = /\.module\.css$/

const isCssRules = rule =>
    rule.test &&
    (rule.test.toString() === CSS_PATTERN.toString() ||
        rule.test.toString() === MODULE_CSS_PATTERN.toString())

const findCssRules = config =>
    config.module.rules.find(
        rule => Array.isArray(rule.oneOf) && rule.oneOf.every(isCssRules)
    )


/**
 * See documentation here: https://www.gatsbyjs.org/docs/add-custom-webpack-config/
 * Unfortunately, adding to the default css setup has to be hacky because
 * setWebpackConfig doesn't handle every edge case. The hacks required to get this
 * working were inspired by:
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-postcss/src/gatsby-node.js
 *
 * @param getConfig
 * @param stage
 * @param actions
 * @param loaders
 * @param rules
 */
exports.onCreateWebpackConfig = ({ getConfig, stage, actions, loaders, rules }) => {

    const isSSR = stage.includes(`html`)
    const config = getConfig()
    const cssRules = findCssRules(config)
    const typingLoader = {
        loader  : 'typings-for-css-modules-loader',
        options : {
            modules         : true,
            importLoaders   : 1,
            localIndentName : '[path]___[name]__[local]___[hash:base64:5]',
            namedExport     : true,
            camelCase       : true
        }
    }

    const typingRule = {
        test: CSS_PATTERN,
        use: isSSR
          ? [loaders.null()]
          : [loaders.css({ importLoaders: 1 }), typingLoader],
    }

    const typingRuleModule = {
        test : MODULE_CSS_PATTERN,
        use  : [
            loaders.css({
              modules: true,
              importLoaders: 1,
            }),
            typingLoader
        ]
    }

    if (!isSSR) {
        typingRule.use.unshift(loaders.miniCssExtract())
        typingRuleModule.use.unshift(loaders.miniCssExtract())
    }

    const typingRules = { oneOf: [] }

    switch (stage) {
      case `develop`:
      case `build-javascript`:
      case `build-html`:
      case `develop-html`:
        typingRules.oneOf.push(...[typingRuleModule, typingRule])
        break
    }

    if (cssRules) {
        cssRules.oneOf.unshift(...typingRules.oneOf)
        actions.replaceWebpackConfig(config)
    }
    else {
        actions.setWebpackConfig({ module : { rules : [typingRules] } })
    }
}
