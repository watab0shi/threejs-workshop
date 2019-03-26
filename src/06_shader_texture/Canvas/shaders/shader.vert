varying vec2 vUv;

uniform float uFixAspect;

void main() {
  // 余白ができないようにアスペクト補正
  vUv = uv - .5;
  vUv.y *= uFixAspect;
  vUv += .5;

  gl_Position = vec4( position, 1.0 );
}



// mouse
//------------------------------
// varying vec2 vUv;
// varying vec2 vMouse;

// uniform float uAspect;
// uniform float uFixAspect;
// uniform vec2 uMouse;

// void main() {
//   // 余白ができないようにアスペクト補正
//   vUv = uv - .5;
//   vUv.y *= uFixAspect;
//   vUv += .5;

//   vMouse = uMouse - .5;
//   vMouse.y *= uFixAspect;
//   vMouse += .5;

//   gl_Position = vec4( position, 1.0 );
// }
