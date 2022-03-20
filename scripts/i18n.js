const fs = require('fs');
const path = require('path');

const viDictionaryPath = 'src/i18n/vi';
const enDictionaryPath = 'src/i18n/en';

const cloneIndexDotTs = () => {
  const source = path.join(viDictionaryPath, 'index.ts');
  const dest = path.join(enDictionaryPath, 'index.ts');
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  fs.copyFileSync(source, dest);
};

cloneIndexDotTs();
