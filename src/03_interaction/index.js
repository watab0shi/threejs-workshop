import Canvas from './Canvas';

export default class Page03 {
  constructor() {
    const canvas = new Canvas();

    canvas.scrolled(window.scrollY);

    window.addEventListener('mousemove', e => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });
    
    window.addEventListener('scroll', e => {
      canvas.scrolled(window.scrollY);
    });
  }
};