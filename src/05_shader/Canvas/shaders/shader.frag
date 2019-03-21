// fragment shader ( フラグメントシェーダー、ピクセルシェーダー )
// このファイルに各ピクセルごとの処理を記述します

varying vec2 vUv;// 頂点シェーダーから varying 変数を受け取る

uniform float uAspect;// 画面のアスペクト比
uniform float uTime;// 画面のアスペクト比

void main() {
  vec2 uv = vec2( vUv.x * uAspect, vUv.y );
  vec2 center = vec2( .5 * uAspect, .5 );// 画面の中心
  float radius = 0.05 + sin( uTime * 2.0 ) * 0.025;// 半径をアニメーションさせる
  float lightness = radius / length( uv - center );// 半径を、中心から現在のピクセルへのベクトルの距離で割る
  // lightness = clamp( lightness, 0.0, 1.0 );// 値の範囲を 0.0 ~ 1.0 に制限
  vec4 color = vec4( vec3( lightness ), 1.0 );

  color *= vec4( 0.2, 1.0, 0.5, 1.0 );// グレースケールに着色する

  gl_FragColor = color;// gl_FragColor に vec4 型（rgba）の色を入れることでピクセル色を決定する。
}
