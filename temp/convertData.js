const load_data_bidding = document.querySelector('#load_data_bidding')
let dataAll = []
const getData = () => {
    const items = document.querySelectorAll('#load_data_bidding .item')

    const data = [];
    items.forEach(item => {
        const name = item.querySelector('.c-name h3')
        const date = item.querySelector('div:nth-child(5)')
        const result = item.querySelector('div:nth-child(6)')

        const obj = {
            name: name.innerText,
            date: date.innerText,
            result: result.innerText
        }
        data.push(obj)
    })
    console.log(data);
    dataAll = [...dataAll, ...data]
    return Promise.resolve()
}

const replaceData = async(page = 1) => {
    const res = await fetch(`https://dauthau.asia/businesslistings/resultdetail/CONG-TY-TNHH-THUONG-MAI-DONG-NAM-43338/?order=7&package=1&page=${page}`)
    const data = await res.text()

    const dataReplaces = data.slice(data.indexOf('<div class="bidding-list-body" id="load_data_bidding">') + '<div class="bidding-list-body" id="load_data_bidding">'.length, data.indexOf('<div class="bidding-list-pagenav">'))
    load_data_bidding.innerHTML = dataReplaces
    
    return Promise.resolve()
}

const main = async() => {
    let count = 1;
    await (new Promise((resolve, reject) => {
        const interval = setInterval(async() => {
            console.log(count);
            if (count > 231) {
                clearInterval(interval)
                return resolve()
            }
            await replaceData(count)
            await getData()
            ++count

        }, 5000)
    }))
    console.log(dataAll)
}
main()
