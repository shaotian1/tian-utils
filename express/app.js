
const fs = require('fs');
const path = require('path');
const app = require('express')();

const {openWebUrl} = require('./utils');

app.listen(5050, () => openWebUrl('http://127.0.0.1:5050'));

// 加载example/main/a.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../example/main/a.html'));
});

// 加载dist/umd/index.js 打包后的代码
app.get('/tian', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/umd/index.js'));
})

// 加载example/main/*.js
app.get('/test/*', (req, res) => {
    const fileName = `${req.path.replace('/test/', '')}.js`;
    const filePath = path.resolve(__dirname, `../example/main/${fileName}`);
    const isExist = fs.existsSync(filePath);
    if (isExist) {
        res.sendFile(filePath);
    } else {
        res.send(`404: example/main/${fileName}`);
    }
})