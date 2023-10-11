    let PAGE_ACTIVE = ''
    const PAGE_LIST = {
        open: {
            name: 'Kết quả mở thầu',
            cols: [
                {
                    children: [
                        {
                            name: 'code',
                            binding: '.bidding-code',
                            handle: ['get', 'remove'],
                        },
                        {
                            name: 'name',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: null,
                            binding: '.solicitor-code',
                            handle: ['remove'],
                        },
                        {
                            name: 'bid_solicitor',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'date_open',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    name: 'result',
                    children: [
                        {
                            name: 'status',
                            binding: '.flex-column-stretch div div:first-child',
                            handle: ['get'],
                        },
                        {
                            name: 'bidder_count',
                            binding: '.flex-column-stretch div div:last-child',
                            handle: ['get'],
                        },
                    ]
                },
            ]
        },
        devprojects: {
            name: 'Dự án đầu tư phát triển',
            cols: [
                {
                    children: [
                        {
                            name: 'code',
                            binding: '.bd-code',
                            handle: ['get', 'remove'],
                        },
                        {
                            name: 'name',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'bid_solicitor',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'date_create',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'khlcnt',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
            ]
        },
        'detail/goi-thau-dau-qua-mang': {
            name: 'GÓI THẦU ĐẤU QUA MẠNG',
            cols: [
                {
                    children: [
                        {
                            name: 'code',
                            binding: '.bidding-code',
                            handle: ['get', 'remove'],
                        },
                        {
                            name: 'name',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: '',
                            binding: '.solicitor-code',
                            handle: ['remove'],
                        },
                        {
                            name: 'solicitor',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'date',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: '',
                            binding: 'div',
                            handle: ['remove'],
                        },
                    ]
                },
            ]
        },
        'detail/goi-thau-truc-tiep': {
            name: 'GÓI THẦU TRỰC TIẾP',
            cols: [
                {
                    children: [
                        {
                            name: 'code',
                            binding: '.bidding-code',
                            handle: ['get', 'remove'],
                        },
                        {
                            name: 'name',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: '',
                            binding: '.solicitor-code',
                            handle: ['remove'],
                        },
                        {
                            name: 'solicitor',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: 'date',
                            binding: 'div',
                            handle: ['get'],
                        },
                    ]
                },
                {
                    children: [
                        {
                            name: '',
                            binding: 'div',
                            handle: ['remove'],
                        },
                    ]
                },
            ]
        },
    }
    const tBody = document.querySelector('.bidding-table tbody')

    const getDataList = (page = 1) => {
        // Lấy ra tất cả các hàng trong cái bảng đó
        const rowsInTable = document.querySelectorAll('.bidding-table tbody tr')
        return new Promise((resolve, reject) => {
            const listData = []

            rowsInTable.forEach(row => {
                // Lấy ra những col trong 1 row
                const tds = row.querySelectorAll('td')
                // tạo ra cái data row để lấy dữ liệu trong 1 hàng
                let dataRow = {}

                // Lặp qua mấy cái cột trong hàng đó để xử lý
                tds.forEach((td, index) => {
                    // mapping cái cột trong domElement với cái cột mà mình định nghĩa
                    const colEle = PAGE_LIST[PAGE_ACTIVE]['cols'][index]
                    // này là tạo ra cái object để lưu dữ liệu trong 1 cột á
                    const dataCol = {}

                    // Lấy ra danh sách đối tượng cần lấy trong 1 cột
                    const children = colEle.children

                    // lặp qua từng thằng để xử lý nè
                    children.forEach((child) => {
                        // này là lấy ra cái child trong domElement nè
                        const childEle = td.querySelector(child.binding)

                        // lấy ra cái danh sách nhiệm vụ cần xử lý trong cái child 
                        const handle = child.handle

                        // Nếu không có cái child element đó thì kiểm tra nếu nó cần get thì cho thằng đó bằng null,
                        //  xong thì bỏ qua vòng lặp này
                        if (!childEle) {
                            handle.includes('get') && (dataRow[child.name] = null)
                            return
                        }

                        // Kiểm tra xem nó có get thì lấy bỏ vô cái dataCol
                        if (handle.includes('get')) {
                            dataCol[child.name] = childEle.innerText
                        }

                        // Kiểm tra nó có remove thì xóa
                        if (handle.includes('remove')) {
                            childEle.remove()
                        }
                    })

                    // Kiểm tra xem nó có name không
                    // có name có nghĩa là nó sẽ là một object chứa các thuộc tính trong children
                    if (colEle.name) {
                        dataRow[colEle.name] = dataCol
                        return
                    }
                    // Nếu không có name thì mình lấy cái thuộc tính đó bỏ thẳng vô trong thằng row luôn.
                    dataRow = { ...dataRow, ...dataCol }
                })
                // Tạo xong cái đối tượng thì phải add nó vào cái listData chứ không lẽ để không ;)
                listData.push(dataRow)
            })

            // Xong cái danh sách của một page rồi thì mình lại cho nó vào cái object của page đó thôi.
            return resolve(listData)
        })
    }

    const replaceDataFromFetch = (dataRaw) => {
        return dataRaw.slice(dataRaw.indexOf('<tbody>') + 7, dataRaw.indexOf('</tbody>'))
    }

    const changeDataTbody = (dataReplaces) => {
        tBody.innerHTML = dataReplaces
        return Promise.resolve();
    }

    const fetchData = async (page = 2) => {
        const res = await fetch(`https://dauthau.asia/${PAGE_ACTIVE}/?page=${page}`)
        if (res.status === 404) {
            return 404
        }
        if (!res.ok) {
            return false
        }
        return replaceDataFromFetch(await res.text())
    }

    const appendResultToBackgroud = (data) => {
        const background = document.getElementById('page-active-background')
        const element = document.createElement('div')
        const title = document.createElement('h5')
        const button = document.createElement('button')

        element.style = 'display: flex; justify-content: center'

        title.innerText = 'Kết quả của: ' + data.pageCur
        
        button.innerText = 'coppy'

        element.appendChild(title)
        element.appendChild(button)
        background.appendChild(element)
        
        button.onclick = (e) => {
            navigator.clipboard.writeText(JSON.stringify(data.dataRoot));
        }
    }

    const handler = async () => {
        const handleInterval = new Promise(resolve => {
            let count = 1
            const DATA_ROOT = {}
            const pageCur = PAGE_ACTIVE
            const interval = setInterval(async () => {
                console.log(count);
                const dataReplaces = await fetchData(count)

                if (count > 30 || dataReplaces == 404) {
                    clearInterval(interval)
                    return resolve({
                        pageCur,
                        dataRoot: DATA_ROOT
                    })
                }
                if (dataReplaces === false) {
                    return resolve()
                }
                await changeDataTbody(dataReplaces)
                const listData = await getDataList(count)

                DATA_ROOT[`page_${count}`] = listData

                console.log(new Date());
                count++
            }, 1000)
        })

        const dataResult = await handleInterval

        appendResultToBackgroud(dataResult)
        console.log('Kết quả của ' + dataResult.pageCur);
        console.log(JSON.stringify(dataResult.dataRoot));
    }

    const eventRoot = () => {
        const pageActiveSelectEle = document.querySelector('#page-active-select')
        const pageActiveButton = document.querySelector('#page-active-button')
        pageActiveButton.onclick = async() => {
            PAGE_ACTIVE = pageActiveSelectEle.value
            console.log(
                '=============================\n' +
                ' bắt đầu lấy dữ liệu từ trang ' + PAGE_ACTIVE +
                '\n============================='
            );
            handler()
        }
    }

    const createBoxAction = () => {
        const bg = document.createElement('div')
        bg.id = 'page-active-background'
        bg.style =
            'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgb(0, 0, 0); display: flex; align-items: center; justify-content: center; z-index: 100000; flex-direction: column;'

        // Tạo select 
        const selectEle = document.createElement('select')
        let options = ''
        for (const key in PAGE_LIST) {
            const pageItem = PAGE_LIST[key];
            options += `<option value="${key}">${pageItem.name}</option>`;
        }
        console.log(options);
        selectEle.id = 'page-active-select'
        selectEle.style.width = 'max-content'
        selectEle.innerHTML = options

        // Tạo button
        const buttonEle = document.createElement('button')
        buttonEle.id = 'page-active-button'
        buttonEle.innerText = 'Chọn'

        bg.appendChild(selectEle)
        bg.appendChild(buttonEle)
        document.body.appendChild(bg)

        return Promise.resolve()
    }

    const main = async () => {
        await createBoxAction()
        eventRoot()
    }

    main()