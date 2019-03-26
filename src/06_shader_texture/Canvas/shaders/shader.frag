varying vec2 vUv;

uniform sampler2D uTex;
uniform float uPercent;

void main() {
  vec3 color = texture2D( uTex, vUv ).rgb;

  gl_FragColor = vec4( color, 1.0 );
}

// invert
//------------------------------
// varying vec2 vUv;

// uniform sampler2D uTex;
// uniform float uPercent;

// void main() {
//   vec3 color = texture2D( uTex, vUv ).rgb;
//   vec3 invert = 1. - color;

//   color = mix( color, invert, uPercent );

//   gl_FragColor = vec4( color, 1.0 );
// }


// mosaic
//------------------------------
// varying vec2 vUv;

// uniform float uPercent;
// uniform sampler2D uTex;

// void main() {
//   vec2 uv = vUv;

//   float moz = uPercent * 0.02;

//   if( moz > 0. ) {
//     uv = floor( uv / moz ) * moz + ( moz * .5 );
//   }

//   vec3 color = texture2D( uTex, uv ).rgb;

//   gl_FragColor = vec4( color, 1.0 );
// }


// swing
//------------------------------
// varying vec2 vUv;

// uniform float uTime;
// uniform float uPercent;
// uniform sampler2D uTex;

// void main() {
//   vec2 uv = vUv;

//   float t = uTime * 6.;
//   float amount = uPercent * 0.02;

//   vec2 uvOffset = vec2( cos( uv.y * 20. + t ), sin( uv.x * 10. - t ) ) * amount;

//   vec3 color = texture2D( uTex, uv + uvOffset ).rgb;

//   gl_FragColor = vec4( color, 1.0 );
// }




// RGB Shift
//------------------------------
// varying vec2 vUv;

// uniform float uPercent;
// uniform sampler2D uTex;

// void main() {
//   float shift = uPercent * .01;

//   float r = texture2D( uTex, vUv + vec2( shift, 0.0 ) ).r;
//   float g = texture2D( uTex, vUv ).g;
//   float b = texture2D( uTex, vUv - vec2( shift, 0.0 ) ).b;

//   vec3 color = vec3( r, g, b );

//   gl_FragColor = vec4( color, 1.0 );
// }
