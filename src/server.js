const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors())

app.get('/data/:fileName', async(req, res) => {
    let fileName = req.params.fileName || '';

    fileName += '.json'
    const pathData = __dirname + '/data/';
    const dirData = fs.readdirSync(pathData)
    const checkFileExist = dirData.some(fileNameOnDisk => fileNameOnDisk == fileName)
    if (!checkFileExist) {
        return res.json({
            status: false,
            message: `File ${fileName} not found`,
            body: null,
        })
    }
    const dataString = fs.readFileSync(pathData + fileName, 'utf8');
    return res.json({
        status: true,
        message: 'Thành công',
        body: JSON.parse(dataString)
    });
})

app.listen(8081, () => {
    console.log('app đang chạy tại cổng: ' + 8081);
})
