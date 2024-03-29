
const path = require('path');
const {log} = require('../bin/utils');
const app = require('express')();

app.listen(5050, () => log.success('server started on port 5050'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../example/scheduler/index.html'));
});