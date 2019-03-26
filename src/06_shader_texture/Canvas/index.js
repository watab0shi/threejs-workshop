import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';
import { Scene } from 'three/src/scenes/Scene';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { Vector2 } from 'three/src/math/Vector2';

// シェーダーソース
import vertexSource from './shaders/shader.vert';
import fragmentSource from './shaders/shader.frag';

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    // レンダラーを作成
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.w, this.h);// 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio);// ピクセル比

    // #canvas-containerにレンダラーのcanvasを追加
    const container = document.getElementById("canvas-container");
    container.appendChild(this.renderer.domElement);

    // カメラを作成（背景シェーダーだけならパースいらないので、OrthographicCameraをつかう）
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, -1);

    // シーンを作成
    this.scene = new Scene();

    // 平面をつくる（幅, 高さ, 横分割数, 縦分割数）
    const geo = new PlaneGeometry(2, 2, 1, 1);

    // マウス座標
    this.mouse = new Vector2(0.5, 0.5);
    this.targetPercent = 0.0;

    const loader = new TextureLoader();// テクスチャローダーを作成
    const texture = loader.load('/resource/img/img.jpg');// テクスチャ読み込み

    // uniform変数を定義
    this.uniforms = {
      uAspect: {
        value: this.w / this.h
      },
      uTime: {
        value: 0.0
      },
      uMouse: {
        value: new Vector2(0.5, 0.5)
      },
      uPercent: {
        value: this.targetPercent
      },
      uFixAspect: {
        value: this.h / this.w
      },
      uTex: {
        value: texture
      }
    };

    // uniform変数とシェーダーソースを渡してマテリアルを作成
    const mat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexSource,
      fragmentShader: fragmentSource
    });

    this.mesh = new Mesh(geo, mat);

    // メッシュをシーンに追加
    this.scene.add(this.mesh);

     // 描画ループ開始
    this.render();
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => { this.render(); });

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000;

    // シェーダーに渡す時間を更新
    this.uniforms.uTime.value = sec;

    // シェーダーに渡すマウスを更新
    this.uniforms.uMouse.value.lerp(this.mouse, 0.2);

    // シェーダーに渡す進捗度を更新
    this.uniforms.uPercent.value += (this.targetPercent - this.uniforms.uPercent.value) * 0.1;

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

  mouseMoved(x, y) {
    this.mouse.x = x / this.w;
    this.mouse.y = 1.0 - (y / this.h);
  }
  mousePressed(x, y) {
    this.mouseMoved(x, y);
    this.targetPercent = 1.;// マウスを押したら進捗度の目標値を大きく
  }
  mouseReleased(x, y) {
    this.mouseMoved(x, y);
    this.targetPercent = 0.0;// マウスを押したら進捗度の目標値をデフォルト値に
  }
};