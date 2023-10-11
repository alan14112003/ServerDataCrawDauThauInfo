const fs = require('fs');

const main = () => {
    const pathFile = __dirname + '/data/dataGoiThauTrucTiep.json'
    const dataString = fs.readFileSync(pathFile)
    const dataJson = JSON.parse(dataString)
    let array = []
    for (const key in dataJson) {
        const element = dataJson[key];
        array = [...array, ...element]
    }
    fs.writeFileSync(pathFile, JSON.stringify(array))
    console.log('Thành công');
}

main()