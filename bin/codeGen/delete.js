const {rimraf} = require('rimraf');
const {resolve} = require('path');
const {log, isExistMethod} = require('../utils');
const fileSaver = require('file-save');
const fncName = process.argv[2];
const methodsMaps = require('../../methods.json');
const {exportGenerate} = require('./exportGenerate');

if (!fncName) {
    log.warning('请输入需要删除的方法名，e.g: make delete xxx');
    return;
}

isExistMethod(fncName)
    .then(() => {
        delete methodsMaps[fncName];

        // 更新methods.json
        fileSaver(resolve(__dirname, '../../methods.json'))
            .write(JSON.stringify(methodsMaps, null, 4), 'utf-8')
            .end('\n');

        // 删除文件
        rimraf(resolve(__dirname, `../../src/${fncName}`))
            .then(() => {
                log.success(`方法[ ${fncName} ]已被删除！`);
                // 根据src文件目录生成 导出文件 src/index.ts
                exportGenerate();
            })
            .catch(err => {
                log.error(err);
            });
    })
    .catch(() => {
        log.warning('没有此方法！');
    });
