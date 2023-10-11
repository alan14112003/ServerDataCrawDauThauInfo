const aElements = document.querySelectorAll('.container .col-xs-24.col-sm-12.col-md-6.col-lg-4 a')
const regex = /^(.*?) \((.*?)\)$/;

const listObj = []
aElements.forEach(aEle => {
    const data = aEle.innerText;

    const matches = data.match(regex);
    const name = matches[1]
    const count = +matches[2].replace(',', '')
    const obj = {
        name,
        count
    }
    listObj.push(obj)
})

console.log(JSON.stringify(listObj));

// const items = document.querySelectorAll('.bidding-list-body.bidding-list-body-order .item')
// const listObj = []
// items.forEach(item => {
//     const name = item.querySelector('.c-name h3').innerText
//     const cGiaEle = item.querySelector('.c-gia')
//     cGiaEle.querySelector('.label-name').remove()
//     const cGia = cGiaEle.innerText
//     const obj = {
//         name,
//         total: cGia
//     }
//     listObj.push(obj)
// })
// console.log(JSON.stringify(listObj));