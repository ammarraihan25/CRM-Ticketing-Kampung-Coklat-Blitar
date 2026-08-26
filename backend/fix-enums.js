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
  let newContent = content.replace(/type:\s*'enum',\s*enum:\s*[a-zA-Z_]+,\s*/g, "type: 'varchar', ");
  newContent = newContent.replace(/type:\s*'enum',\s*enum:\s*[a-zA-Z_]+\s*}/g, "type: 'varchar' }");
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed', file);
  }
});
