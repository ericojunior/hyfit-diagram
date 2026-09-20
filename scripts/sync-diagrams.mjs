import { readFileSync, writeFileSync } from 'node:fs';
let readme = readFileSync('README.md', 'utf8');
const original = readme;
for (const name of ['containers', 'concluir-sessao']) {
  const source = readFileSync(`diagrams/${name}.mmd`, 'utf8').trimEnd();
  const begin = `<!-- diagram:${name}:start -->`;
  const end = `<!-- diagram:${name}:end -->`;
  const startIndex = readme.indexOf(begin);
  const endIndex = readme.indexOf(end);
  if (startIndex < 0 || endIndex < startIndex) throw new Error(`Marcadores ausentes: ${name}`);
  readme = readme.slice(0, startIndex) + `${begin}\n\n\`\`\`mermaid\n${source}\n\`\`\`\n\n${end}` + readme.slice(endIndex + end.length);
}
if (process.argv.includes('--check')) {
  if (readme !== original) { console.error('README diverge das fontes Mermaid. Execute npm run docs:sync.'); process.exit(1); }
  console.log('README sincronizado com as fontes Mermaid.');
} else writeFileSync('README.md', readme);
