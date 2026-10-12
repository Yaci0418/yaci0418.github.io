'use strict';
const themeButton = document.querySelector('#theme');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀' : '☾';
  themeButton.setAttribute('aria-label', theme === 'dark' ? '切换为日间主题' : '切换为夜间主题');
}
let initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try { const saved = localStorage.getItem('yaci-theme'); if (saved === 'dark' || saved === 'light') initialTheme = saved; } catch {}
applyTheme(initialTheme);
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('yaci-theme', theme); } catch {}
});
document.querySelector('#year').textContent = new Date().getFullYear();
const notes = [
  { tag: '小站手记 / 01', title: '你好，这是故事的第一页。', paragraphs: ['欢迎来到这个小小的空间。你可以把这里想象成一本刚打开的笔记本：第一页写着你好，后面还有很多空白，等着慢慢填满。', '这个网站从一片蓝天、一阵海风和一点樱花粉开始。希望每次打开它，都像推开一扇通往喜欢的世界的门。', '故事才刚开始。感谢你成为第一批路过的人。'] },
  { tag: '灵感便签 / 02', title: '把夏天，装进一封信里。', paragraphs: ['如果夏天是一封信，信纸大概是天空的蓝色，邮票是落在窗边的一片花瓣。', '所以这个小站选择了明亮的海岸、轻轻吹动的头发，还有一封没有写完的信。它们是这次设计的起点，也是留给来访者的一点小小浪漫。', '不需要急着读完。停一会儿，看看云，也很好。'] },
  { tag: '未完待续 / 03', title: '慢一点，也没关系。', paragraphs: ['有些想法会很快长大，有些需要等待合适的季节。还没有完成的作品，也可以先拥有一个位置。', '这里为下一次灵感留了一张空白明信片。等新的故事准备好了，再慢慢把它写下来。', '愿这个小站，也能提醒路过的人：保持好奇，按照自己的节奏向前走。'] }
];
const dialog = document.querySelector('#note-dialog');
let activeTrigger;
document.querySelectorAll('[data-note]').forEach(button => button.addEventListener('click', () => {
  const note = notes[Number(button.dataset.note)];
  activeTrigger = button;
  document.querySelector('#dialog-tag').textContent = note.tag;
  document.querySelector('#dialog-title').textContent = note.title;
  document.querySelector('#dialog-body').replaceChildren(...note.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  dialog.showModal();
}));
document.querySelector('#close-note').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => activeTrigger?.focus());
