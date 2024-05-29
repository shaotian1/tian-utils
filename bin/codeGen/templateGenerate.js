const {resolve} = require('path');
const {log, isExistMethod} = require('../utils');
const fileSaver = require('file-save');
const {getFileDirMaps} = require('./template');
const fncName = process.argv[2];
const methodsMaps = require('../../methods.json');
const {exportGenerate} = require('./exportGenerate');

if (!fncName) {
    log.warning('请输入方法名！');
    return;
}

isExistMethod(fncName)
    .then(() => {
        log.error(`方法[ ${fncName} ]已存在！`);
    })
    .catch(() => {
        methodsMaps[fncName] = true;

        const FILE_DIR_MAPS = getFileDirMaps(fncName);

        // 更新methods.json
        fileSaver(resolve(__dirname, '../../methods.json'))
            .write(JSON.stringify(methodsMaps, null, 4), 'utf-8');

        // 根据预设模版生成文件
        FILE_DIR_MAPS.forEach(fileConfig => {
            fileSaver(fileConfig.path).write(fileConfig.template);
        });
        log.success(`方法[ ${fncName} ]模版已创建成功！`);

        // 根据src文件目录生成 导出文件 src/index.ts
        exportGenerate();
    });


