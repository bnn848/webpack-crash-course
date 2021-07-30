import _ from 'lodash'

// (1) default exportじゃない限り{}でくくる
// import { Nijo, NAME } from './utilities' // 自前のファイルをインポートする際は相対パスで記述する

// (2) 名前付きにするとutilitiesという任意の名前でインポートできる
import * as utilities from './utilities'

// style.cssをインポート
// import style from './style.css';
import './style.css' // css-loaderを用いる場合、 style from は不要

import logo from './logo.png';

// utilities.jsからインポートした関数と定数をindex.jsで使うことができる
// (1)
// console.log(Nijo(19));
// console.log(NAME);

// (2)
console.log(utilities.Nijo(19));
console.log(utilities.NAME);

function component() {
  const element = document.createElement('div');
  const array = ['Hello', 'webpack']
  element.innerHTML = _.join(array, ' ')
  return element;
}

document.body.appendChild(component());
document.body.classList.add('haikei');

const image = new Image()
image.src = logo
document.body.appendChild(image);