## Forked From

[https://github.com/jcreamer898/gatsby-plugin-typescript-css-modules](https://github.com/jcreamer898/gatsby-plugin-typescript-css-modules)

# Gatsby Plugin Typescript CSS Modules
This [GatsbyJS](gatsbyjs.org) plugin adds [typings-for-css-modules-loader](https://github.com/Jimdo/typings-for-css-modules-loader) to your configuration 

Import styles normally
```ts
import * as styles from "./page.module.css";
```

and typings-for-css-modules-loader will read the CSS file and generates a `.d.ts` file alongside your css.

### Installing
First, install the plugin...

```bash
npm i gatsby-transformer-typescript-css-modules --save
```

Then, add the plugin to your `gatsby-config.js`...

```js
  // ...
  "gatsby-transformer-typescript-css-modules"
]
```
