const methodsMaps = require('../methods.json');

const logMap = {
    success: ['\x1B[32m', '\x1B[39m'],
    error: ['\x1B[31m', '\x1B[39m'],
    warning: ['\x1B[33m', '\x1B[39m'],
};

exports.log = {
    success: message => console.log(`\n${logMap.success[0] + message + logMap.success[1]}\n`),
    error: message => console.log(`\n${logMap.error[0] + message + logMap.error[1]}\n`),
    warning: message => console.log(`\n${logMap.warning[0] + message + logMap.warning[1]}\n`)
};

exports.isExistMethod = function(method) {
    return new Promise(async (resolve, reject) => {
        if (methodsMaps[method]) {
            resolve(method);
        } else {
            reject(null);
        }
    });
}