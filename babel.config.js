module.exports = {
   /** presets: ['@babel/preset-env', '@babel/preset-react'],// normal way to user preset*/ 
    presets: ['@babel/preset-env',
             ['@babel/preset-react',{ runtime:'automatic'}] //allows us to not imort React in each file and only need to import react when using some modules like useState ,etc               
            ],
}