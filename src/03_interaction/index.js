import Canvas from './Canvas';

export default class Page02 {
  constructor() {
    const canvas = new Canvas();

    // ページ表示時に前回のスクロール位置が保存されている場合があるので、最初に更新する
    canvas.scrolled(window.scrollY);

    window.addEventListener('mousemove', e => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });
    
    window.addEventListener('scroll', e => {
      canvas.scrolled(window.scrollY);
    });
  }
};