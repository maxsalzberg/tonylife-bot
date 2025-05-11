const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { composePath } = require('../config.json');

function readMods() {
  const content = fs.readFileSync(composePath, 'utf8');
  const match = content.match(/MODS=\(([^)]*)\)/);
  return match ? match[1].trim().split(/\s+/).filter(Boolean) : [];
}

function writeMods(modsArray) {
  let content = fs.readFileSync(composePath, 'utf8');
  content = content.replace(/MODS=\([^\)]*\)/, `MODS=(${modsArray.join(' ')})`);
  fs.writeFileSync(composePath, content);
}

module.exports = { readMods, writeMods };
