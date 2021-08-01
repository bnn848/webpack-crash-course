/**
 * pathをインポートする
 * インポートはCommonJSの記述方法で書く
 * npx webpack : webpack.config.jsの場所は --config オプションをつけるとできる
 */
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * アウトプットする場所を指定する
 * path.resolve = 絶対パスにする(webpackは絶対パスで記述する必要がある)
 * __dirname(ディレクトリ名)/dist をパスとする
 */
const outputPath = path.resolve(__dirname, 'dist')
console.log({outputPath})

/**
 * モジュールを使うためのexport
 * entryによってwebpackのエントリーポイントにする
 * バンドルの対象（何をバンドルするのかを指定する）
 * filename: 'xxx' アウトプットするファイル名を設定できる
 */
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'main.js',
    path: outputPath
  },
  module: { // css-loaderをモジュールとして使うため
    rules: [
      {
        test: /\.jsx?$/, // webpackを使うため、.js .jsxのファイルを指定する()
        exclude: /node_modules/, // node_modulesディレクトリ配下はトランスパイル対象から除外する
        use: {
          loader: "babel-loader", // babel-loaderでトランスパイルする
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(scss|css)$/, // sassを使うためのもの。基本はcssで最初にsass-loaderを利用する
        use: [ // 
          // 'style-loader', // 最後にstyleとして使う
          MiniCssExtractPlugin.loader, // 別ファイルで管理するローダーに変更
          'css-loader', // cssとしてさらにコンパイル
          'sass-loader' // 最初にsassをコンパイル
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i, // (a|b)で複数許容、?はあってもなくても良いという意味、末尾iで大文字許容
        loader: 'url-loader',
        options: {
          limit: 2048, // 2KB以上のサイズのファイルを分割して取得できる
          name: "./images/[name].[ext]" // 一度HTML要素に変換する
        }
      },
      {
        test: /\.html/, // webpackでhtml-loaderを使うため
        loader: 'html-loader'
      }
    ]
  },
  devServer: { // web-pack-dev-serverで起動した時にdist/main.jsを自動で開く設定
    contentBase: outputPath
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html', // 雛形を作り、それをベースに使う
      filename: './index.html' // dist配下にindex.htmlという名前で出力する
    }),
    new MiniCssExtractPlugin({ // cssを圧縮する
      filename: '[name].[hash].css' // インポートしたcssをバンドルする /name = main /hash = 被らないようにランダムで入力される
    })
  ],
  optimization: { // 最適化。
    minimizer: [
      new UglifyJsPlugin({ // UglifyJsPluginはUglify-jsをwebpackに渡すためだけのもの
      uglifyOptions: { // Uglify-jsはオプションで実行したい処理を記述する
        compress: { // GitHubみて確認する
          drop_console: true // defaultはfalse
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({}) // インスタンスを作成するだけ、引数のオブジェクトはなくてOK
    ],
  },
  devtool: 'eval-source-map'
}

/**
 * ファイルの変更を監視して自動で反映される
 */
