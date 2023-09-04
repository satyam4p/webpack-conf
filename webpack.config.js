
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let config = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Set the base directory for serving content (optional)
        },
        historyApiFallback: true
    },
    entry: path.resolve(__dirname, './src/index.js'),
    output:{
        // publicPath:'/',
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
        assetModuleFilename: "images/[hash][ext][query]"
    },
    target: 'web',
    module: {
        rules:[
            {
                test: /\.png|jpe?g|gif|svg$i/,
                //  type: 'asset/resource'
                // type: 'asset/inline'//will provide minified image in js resource itself
                type: 'asset'// webpack automatically detactif it needs to be amde inline or not depending on size of image
            },
            {
                test: /\.(s[ac]|c)ss$/i, //supports sass, scss, css
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: { publicPath: ""},
                    }, 
                    'css-loader', 
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        
        ]
    },
    plugins:[ 
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin(),
        new HtmlWebpackPlugin({
        template: "./public/index.html"
    })],

    resolve: {
        extensions: ['.js', '.jsx']
    }
}


module.exports = (env, argv) => {

    if(argv.mode === "production"){
        config['devtool'] = false
        config['mode'] = "production"
    }else{
        config['devtool'] = true
        config['mode'] = "development"
    }
    
    return config
    
}