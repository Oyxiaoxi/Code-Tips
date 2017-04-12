# weather

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

npm i element-ui --save

npm install css-loader --save-dev

npm install style-loader --save-dev

npm install url-loader --save-dev

npm install vue-resource --save-dev

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Webpack setting

``` Javascript
module:{
    {
        test: /\.css$/,loader: 'style-loader!css-loader'},
    {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
    }
}
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
