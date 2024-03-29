const fs = require('fs');
const path = require('path');
const fileSaver = require('file-save');
const {log} = require('./utils');
const exportTemplates = [];

function pushTemplate(dir) {
    exportTemplates.push(`export * from \'./${dir}\';`);
}

function getTemplate() {
    return exportTemplates.join('\n');
}

// utils 源码目录
const src_path = path.join(__dirname, '../src');

// 读取src目录
const files = fs.readdirSync(src_path);

files.forEach(item => {
    // 判断是否是文件夹
    const isDir = fs.statSync(path.join(src_path, item)).isDirectory();
    if (isDir) {
        pushTemplate(item);
    }
});

fileSaver(path.join(__dirname, '../src/index.ts'))
    .write(getTemplate())

log.success('src export 内容已生成!');