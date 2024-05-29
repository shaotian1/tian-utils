//引入进程模块和os
//exec是个函数,可以用来执行shell脚本
const {exec} = require('child_process');
const os = require('os');
 
//打开浏览器的网页
exports.openWebUrl = (url) => {
    let type = os.platform()
    switch (type) {
        //苹果系统
        case 'darwin':
            exec(`open ${url}`)
            break

        //windows系统
        case 'win32':
            exec(`start ${url}`)
            break

        //linux系统
        default:
            exec(`xdg-open ${url}`)
    }
}