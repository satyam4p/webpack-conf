
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


let config = {

    devServer: {
        static: "./dist",
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    
    module: {
        rules:[
            {
                test: /\.s?css$/i,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        
        ]
    },
    plugins:[ new MiniCSSExtractPlugin()]
}


module.exports = (env, argv) => {

    if(argv.mode === "production"){
        config['devtool'] = false
        config['mode'] = "production"
    }else{
        config['devtool'] = "source-map"
        config['mode'] = "development"
    }
    
    return config
    
}