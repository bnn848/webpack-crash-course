/**
 * pathをインポートする
 * インポートはCommonJSの記述方法で書く
 * npx webpack : webpack.config.jsの場所は --config オプションをつけるとできる
 */
const path = require('path')

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
        test: /\.css$/, // \で.をエスケープ、末尾cssのファイルを指定
        use: [ // useは逆順(下から)ロードされる
          'style-loader', // styleとして適用するためのローダー
          'css-loader' // cssをモジュールとして取り込むためのローダー
        ]
      },
      {
        test: /\.scss$/, // sassを使うためのもの。基本はcssで最初にsass-loaderを利用する
        use: [ // 
          'style-loader', // 最後にstyleとして使う
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
      }
    ]
  },
  devServer: { // web-pack-dev-serverで起動した時にdist/main.jsを自動で開く設定
    contentBase: outputPath
  }
}

/**
 * ファイルの変更を監視して自動で反映される
 */
