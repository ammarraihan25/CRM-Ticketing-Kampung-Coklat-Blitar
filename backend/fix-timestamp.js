const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const files = walkSync('src');
files.filter(f => f.endsWith('.ts')).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/type:\s*'timestamp'/g, "type: 'datetime'");
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed', file);
  }
});
