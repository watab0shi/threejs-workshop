import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/Scene';
import { PointLight } from 'three/src/lights/PointLight';
import { BoxGeometry } from 'three/src/geometries/BoxGeometry';
import { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { Vector2 } from 'three/src/math/Vector2';

export default class Canvas {
  constructor(elementId) {
    // elementIdのついたDOM要素を取得
    this.element = document.getElementById(elementId);
    const rect   = this.element.getBoundingClientRect();

    // スクロール量
    this.scrollY = window.scrollY;

    // マウス座標
    this.mouse = new Vector2(0, 0);

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

    const fov    = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);// 視野角をラジアンに変換
    const dist   = (this.h / 2) / Math.tan(fovRad);// ウィンドウぴったりのカメラ距離

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(fov, this.w / this.h, 1, dist * 2);
    this.camera.position.z = dist;// カメラを遠ざける

    // シーンを作成
    this.scene = new Scene();

    // ライトを作成
    this.light = new PointLight(0x00ffff);
    this.light.position.set(0, 0, 400);// ライトの位置を設定

    // ライトをシーンに追加
    this.scene.add(this.light);

    // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
    const depth = 300;
    const geo   = new BoxGeometry(rect.width, rect.height, depth);

    // マテリアルを作成
    const mat = new MeshLambertMaterial({ color: 0xffffff });

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new Mesh(geo, mat);

    // ウィンドウ中心からDOMRect中心へのベクトルを求めてオフセットする
    const center = new Vector2(rect.x + rect.width / 2, rect.y + rect.height / 2);
    const diff   = new Vector2(center.x - this.w / 2, center.y - this.h / 2);
    this.mesh.position.set(diff.x, -(diff.y + this.scrollY), -depth / 2);
    this.offsetY = this.mesh.position.y;

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

    // 1秒で45°回転する
    // this.mesh.rotation.x = sec * (Math.PI / 4);
    // this.mesh.rotation.y = sec * (Math.PI / 4);

    // スクロールに追従させる
    this.mesh.position.y = this.offsetY + this.scrollY;
    // this.mesh.position.y = this.scrollY * 0.5;// パララックス

    // 画面に表示
    this.renderer.render(this.scene, this.camera);
  }

  mouseMoved(x, y) {
    this.mouse.x =  x - (this.w / 2);// 原点を中心に持ってくる
    this.mouse.y = -y + (this.h / 2);// 軸を反転して原点を中心に持ってくる

    // ライトの xy座標 をマウス位置にする
    this.light.position.x = this.mouse.x;
    this.light.position.y = this.mouse.y;
  }

  scrolled(y) {
    this.scrollY = y;
  }
};