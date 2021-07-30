
/**
 * 他のファイルで利用できるモジュールにするために、Exportする
 * ある引数を受け取るとその２乗を返す関数を作る
 * functionの前にexportをつけるだけ
 * import先でimport ~~ from "ファイル名"とする
 */
export function Nijo(num) {
  return num ** 2;
}

/**
 * export で切るのは関数だけではない。
 * NAMEという定数をexport
 */
export const NAME = "Bob"