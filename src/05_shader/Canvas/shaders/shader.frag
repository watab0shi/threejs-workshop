// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// main 関数でピクセルひとつに対しての処理を記述する
// GPU側で、シェーダーが適用されたオブジェクトの全てのピクセルに対してこの処理が走る

// 頂点シェーダーから渡ってくる変数
varying vec2 vUv;

void main() {
  // UV座標の x を r に、y を g にいれる
  vec4 color = vec4(vUv.x, vUv.y, 1.0, 1.0);

  // ピクセルシェーダーの最後で gl_FragColor に vec4 で rgba を入れて最終的な色を決定する
  gl_FragColor = color;
}
