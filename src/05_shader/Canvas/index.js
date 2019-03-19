import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';
import { Scene } from 'three/src/scenes/Scene';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
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

    // 板ポリをつくる（）
    const geo = new PlaneGeometry(2, 2, 1, 1);

    // シェーダーマテリアルに GLSL のソースを渡す
    const mat = new ShaderMaterial({
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

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }
};