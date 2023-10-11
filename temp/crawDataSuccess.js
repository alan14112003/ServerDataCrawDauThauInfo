(async() => {
    const liEles = document.querySelectorAll('.bidding-list-pagenav .pagination li');
const lastPage = liEles[liEles.length - 2].innerText;

const dataBiddingEle = document.querySelector('#load_data_bidding');
let count = 0;

const countData = () => {
    const items = dataBiddingEle.querySelectorAll('.item')
    for(let item of items) {
        const result = item.querySelector('div:nth-child(6)').innerText
        console.log('result: ', result);
        if (result == "Trúng thầu") {
            console.log("count: ", count);
            count++;
        }
    }
}
const fetchData = async (page) => {
    const url = `https://dauthau.asia/businesslistings/resultdetail/CONG-TY-TNHH-THIET-BI-MINH-TAM-74962/?order=7&package=1&page=${page}`
    const res = await fetch(url)
    const data = (await res.text())
    const htmlValue = data.slice(data.indexOf('<div class="item">'), data.indexOf('<div class="bidding-list-pagenav">'))
    dataBiddingEle.innerHTML = htmlValue

    return Promise.resolve()
}

const handleInterval = new Promise(resolve => {
    let pageCount = 1
    const interval = setInterval(async () => {
        console.log(pageCount);

        if (pageCount > lastPage) {
            clearInterval(interval)
            console.log(`|========================|\n RESULT:${count} \n|================================|`);
            return
        }
        pageCount ++;
        
        await fetchData(pageCount)
        countData()
    }, 4000)
})

const dataResult = await handleInterval
})()
