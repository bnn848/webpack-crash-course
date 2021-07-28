/**
 * pathをインポートする
 * インポートはCommonJSの記述方法で書く
 * npx webpack : webpack.config.jsの場所は --config オプションをつけるとできる
 */
const path = require('path')

/**
 * .resolve = 絶対パスにする(webpackは絶対パスで記述する必要がある)
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
  }
}

/**
 * 
 */
