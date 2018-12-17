import Canvas from './Canvas';

export default class Page04 {
  constructor() {
    const canvas = new Canvas('scroll-container_title');

    window.addEventListener('mousemove', e => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });
    
    window.addEventListener('scroll', e => {
      canvas.scrolled(window.scrollY);
    });
  }
};