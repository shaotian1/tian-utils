const fs = require('fs');
const path = require('path');
const fileSaver = require('file-save');
const {log} = require('../utils');
const {getExampleTemplate} = require('./template');
const dynamicCodeFetchTemplates = [];

// example 源码目录
const main_path = path.join(__dirname, '../../example/main');
    
// 读取src目录
const files = fs.readdirSync(main_path);

files.forEach(fileName => {
    // 判断是否为js文件
    if (fileName.endsWith('.js')) {
        dynamicCodeFetchTemplates.push(
            `           fetchCode('/test/${fileName.replace('.js', '')}');`
        );
    }
});

fileSaver(path.join(__dirname, '../../example/main/a.html'))
    .write(getExampleTemplate(dynamicCodeFetchTemplates.join('\n')), 'utf-8');

log.success('example/main/a.html 生成成功');