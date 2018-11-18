import Canvas00 from './00_empty/Canvas';
import Canvas01 from './01_rendering/Canvas';
import Canvas02 from './02_animation/Canvas';

// ドキュメントを読み込んだらページごとの処理を実行
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.split('/')[1];

  console.log(path);//

  if(path === '00_empty')          new Canvas00();
  else if(path === '01_rendering') new Canvas01();
  else if(path === '02_animation') new Canvas02();
});
