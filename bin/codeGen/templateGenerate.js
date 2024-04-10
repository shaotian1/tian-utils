const {resolve} = require('path');
const {log} = require('../utils');
const fileSaver = require('file-save');
const {getFileDirMaps} = require('./template');
const fncName = process.argv[2];
const methodsMaps = require('../../methods.json');

if (!fncName) {
    log.warning('请输入方法名！');
    return;
}

if (methodsMaps[fncName]) {
    log.error(`方法[ ${fncName} ]已存在！`);
    return;
}

methodsMaps[fncName] = true;

const FILE_DIR_MAPS = getFileDirMaps(fncName);

fileSaver(resolve(__dirname, '../../methods.json'))
  .write(JSON.stringify(methodsMaps, null, 4), 'utf-8')
  .end('\n');

FILE_DIR_MAPS.forEach(fileConfig => {
    fileSaver(fileConfig.path).write(fileConfig.template);
});

log.success(`方法[ ${fncName} ]模版已创建成功！`);
