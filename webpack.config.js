
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
                test: /\.(s[ac]|c)ss$/i, //supports sass, scss, css
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader']
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
    plugins:[ new MiniCSSExtractPlugin()],

    resolve: {
        extensions: ['.js', '.jsx']
    }
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