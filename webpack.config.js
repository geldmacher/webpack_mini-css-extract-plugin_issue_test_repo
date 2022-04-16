
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

class AssetsPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('AssetsPlugin', (compilation) => {

            const stats = compilation.getStats().toJson({
                all: true
            });

            console.log(stats.entrypoints['index']);
        });
    }
};

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
	output: {
        filename: '[name].[contenthash:8].js',
        assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].[contenthash:8].css',
            experimentalUseImportModule: true
        }),
        new AssetsPlugin()
    ],
	module: {
		rules: [
			{
                test: /\.(woff2?|ttf|eot|otf|png|jpe?g|gif|ico|svg|webp)$/,
                type: 'asset'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            esModule: true
                        }
                    }
                ]
            },
		]
	}
};