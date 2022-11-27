const fs = require('fs');
const path = require('path');

const rootFolder = path.join(process.cwd(), 'src', 'features', 'settings', 'components');

const generateIndexEndpoint = () => {
  const fileNames = fs.readdirSync(rootFolder);
  const indexFile = path.join(rootFolder, 'index.ts');

  const content = fileNames.reduce((content, fileName) => {
    const name = fileName.split('.')[0];
    if (name === 'index') return content;

    const exportString = `export * from './${name}';`;

    return `${content}${exportString}\n`;
  }, []);

  fs.writeFileSync(indexFile, content);
};

const convertDefaultToNamedExport = () => {
  const fileNames = fs.readdirSync(rootFolder);

  for (const fileName of fileNames) {
    const filePath = path.join(rootFolder, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const replaced = fileContent.replace('export default function', 'export function');
    fs.writeFileSync(filePath, replaced);
  }
};

convertDefaultToNamedExport();
generateIndexEndpoint();
