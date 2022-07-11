const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: '../server/views',
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        }
      ]
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve('src'))
		config.module
            .rule('svg-sprite')
            .use('svgo-loader')
            .loader('svgo-loader');
  },
	pluginOptions: {
		svgSprite: {
			/*
			 * The directory containing your SVG files.
			 */
			dir: 'src/assets/svg-icons',
			/*
			 * The reqex that will be used for the Webpack rule.
			 */
			test: /\.(svg)(\?.*)?$/,
			/*
			 * @see https://github.com/kisenka/svg-sprite-loader#configuration
			 */
			loaderOptions: {
					extract: true,
					spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
			},
			/*
			 * @see https://github.com/kisenka/svg-sprite-loader#configuration
			 */
			pluginOptions: {
					plainSprite: true
			}
		}
	},
  devServer: {
    historyApiFallback: true,
    proxy: 'http://localhost:8082'
  }
}
