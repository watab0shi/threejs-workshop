// vertex shader ( 頂点シェーダー )
// main 関数で頂点ひとつに対しての処理を記述する
// GPU側で、シェーダーが適用された全ての頂点に対してこの処理が走る

// varying : 頂点シェーダーからフラグメントシェーダーに値を共有するための装飾子
// 頂点シェーダーからフラグメントシェーダーに値が渡るときに、頂点ごとの情報をピクセルごとの情報にGPU側で補間してくれる
varying vec2 vUv;

void main() {
  // varying 変数に値を代入して、フラグメントシェーダーに
  // uv は ShaderMaterial で自動的に定義されている、UV座標が入った vec2 変数
  vUv = uv;

  // 頂点シェーダーの最後で gl_Position に vec4 で座標を入れて最終的な頂点座標を決定する
  // position は ShaderMaterial で自動的に定義されている、頂点のxyz座標が入った vec3 変数
  gl_Position = vec4( position, 1.0 );
}