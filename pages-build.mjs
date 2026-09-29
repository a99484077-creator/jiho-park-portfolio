import {cpSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

// GitHub Pages serves a project repository under /repository-name/.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
if (!repository) throw new Error('GITHUB_REPOSITORY is required (owner/repository).');
const base = repository.endsWith('.github.io') ? '/' : `/${repository}/`;

rmSync('_site', {recursive: true, force: true});
cpSync('dist', '_site', {recursive: true});

function visit(directory) {
  for (const entry of readdirSync(directory, {withFileTypes: true})) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (entry.name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      writeFileSync(path, html.replace(/\b(href|src)="\/([^\"]*)"/g, (_, attr, rest) => `${attr}="${base}${rest}"`));
    }
  }
}
visit('_site');

const appPath = '_site/app.js';
let app = readFileSync(appPath, 'utf8');
const edits = [
  ["const url=p=>`/portfolio/${p.id}/`;", "const siteBase=new URL('.',import.meta.url).pathname;const siteUrl=path=>siteBase+path.replace(/^\\/+/, '');const url=p=>siteUrl(`/portfolio/${p.id}/`);"],
  ['src="${e(src)}"', 'src="${e(siteUrl(src))}"'],
  ['href="${href}"', 'href="${e(href.startsWith(\'/\')?siteUrl(href):href)}"'],
  ['href="/portfolio/">←', 'href="${siteUrl(\'/portfolio/\')}">←'],
  ["{src:p.hero,alt:heroCaption", "{src:siteUrl(p.hero),alt:heroCaption"],
  ["({src:g.src,alt:t(g.caption)", "({src:siteUrl(g.src),alt:t(g.caption)"],
  ["const path=location.pathname.replace(/\\/$/,'')||'/'", "const path=('/'+location.pathname.slice(siteBase.length)).replace(/\\/$/,'')||'/'"],
  ["fetch('/content.json')", "fetch(siteUrl('/content.json'))"],
];
for (const [before, after] of edits) {
  if (!app.includes(before)) throw new Error(`App code changed: cannot find ${before}`);
  app = app.replace(before, after);
}
writeFileSync(appPath, app);
writeFileSync('_site/.nojekyll', '');
console.log(`Prepared GitHub Pages site at ${base}`);
