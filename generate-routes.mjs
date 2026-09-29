import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const content=JSON.parse(readFileSync('dist/content.json','utf8'));
const template=readFileSync('dist/index.html','utf8')
 .replace(/<script id="site-content" type="application\/json">[\s\S]*?<\/script>/g,'')
 .replace(/<link rel="preload" as="image"[^>]* data-site-preload>/g,'');
const embeddedContent=JSON.stringify(content).replaceAll('<','\\u003c');
function page(route){
 const covers=route===''?[content.projects.find(p=>p.featured)?.cover]:
  route==='portfolio'?content.projects.filter(p=>p.section!=='additional').slice(0,2).map(p=>p.cover):
  route.startsWith('portfolio/')?[content.projects.find(p=>route===`portfolio/${p.id}`)?.hero]:[];
 const preloads=covers.filter(Boolean).map(src=>`<link rel="preload" as="image" href="${src}" fetchpriority="high" data-site-preload>`).join('');
 return template.replace('<link rel="stylesheet"',preloads+'<link rel="stylesheet"')
  .replace('</head>',`<script id="site-content" type="application/json">${embeddedContent}</script></head>`);
}
writeFileSync('dist/index.html',page(''));
for(const route of ['portfolio','resume',...content.projects.map(p=>`portfolio/${p.id}`)]){
 if(!/^[a-z0-9/-]+$/.test(route))throw new Error('Invalid project id');
 mkdirSync(`dist/${route}`,{recursive:true});writeFileSync(`dist/${route}/index.html`,page(route));
}
writeFileSync('dist/404.html',page('404'));
console.log('Generated portfolio and resume routes');
