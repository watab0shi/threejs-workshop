import Canvas from './Canvas';

export default class Page06 {
  constructor() {
    const canvas = new Canvas();

    window.addEventListener('mousemove', e => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });

    window.addEventListener('mousedown', e => {
      canvas.mousePressed(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', e => {
      canvas.mouseReleased(e.clientX, e.clientY);
    });
  }
};