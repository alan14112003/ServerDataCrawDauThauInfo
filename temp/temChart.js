var draw_test_01 = function () {
    var name = "";
    var data = {
        labels: ["Month 1", "Month 2", "Month 3", "Month 4"],
        datasets: [
            {
                label: "Group 01",
                backgroundColor: "#5F9EA0",
                data: [50, 50, 50, 50]
            },
            {
                label: "Group 02",
                backgroundColor: "#B0C4DE",
                data: [40, 40, 40, 40]
            },
            {
                label: "Group 03",
                backgroundColor: "#87CEEB",
                data: [30, 30, 30, 30]
            },
        ]
    }

    var options = {
        responsive: true,
        legend: {
            position: "right",
        },
        title: {
            display: true,
            text: "Test 01"
        },
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 0
                }
            }]
        }
    }

    do_gl_create_chart_bar("#div_chart_01", "bar", data, options);

}

var draw_test_02 = function () {
    var options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: '',
                position: 'bottom'
            }
        },
    };

    const data = [
        {
            title: 'Tổng quan',
            labels: ['Trúng thầu', 'Chưa có kết quả', 'Trượt thầu'],
            datasets: [
                {
                    label: 'Gói thầu',
                    data: [709, 432, 3206],
                    backgroundColor: ['cyan', 'yellow', 'pink']
                },
            ]
        },
        {
            title: 'Đấu với đối thủ',
            labels: ['Trúng thầu', 'Chưa có kết quả', 'Trượt thầu'],
            datasets: [
                {
                    label: 'Gói thầu',
                    data: [506, 409, 3200],
                    backgroundColor: ['cyan', 'yellow', 'pink']
                },
            ]
        },
        {
            title: 'Đấu thầu khi liên danh',
            labels: ['Trúng thầu', 'Chưa có kết quả', 'Trượt thầu'],
            datasets: [
                {
                    label: 'Gói thầu',
                    data: [9, 1, 2],
                    backgroundColor: ['cyan', 'yellow', 'pink']
                },
            ]
        }
    ]

    const rootDiv = $('#div_chart_02')[0]
    rootDiv.style.display = 'flex'
    rootDiv.style.justifyContent = 'center'

    for (let i = 0; i < data.length; i++) {
        const dataEle = data[i];
        const dataDomEle = document.createElement('div')
        dataDomEle.id = 'div_chart_data_ele_' + i
        rootDiv.appendChild(dataDomEle)

        options.plugins.title.text = dataEle.title

        do_gl_create_chart_bar('#' + dataDomEle.id, "doughnut", dataEle, options);
    }

}

// Hàm gọi và xử lý dữ liệu về lại dataset
const callOnlineAndOfflineAndReplaceDataRawToDataset = async () => {
    const labels = [], hits = [], mises = [], obj = {}

    // gửi yêu cầu đến server
    const responseData = await fetch('http://localhost:8081/online-offline')

    // lấy ra dữ liệu ban đầu
    const dataRaw = await responseData.json() ?? [];

    // lặp qua từng dữ liệu và bắt đầu đếm tổng số lượng trúng/trượt thầu qua từng năm
    dataRaw.forEach(dataItem => {
        // Lấy ra date của dataRaw
        const date = dataItem.date.split('/')[2].slice(0, 4)

        // kiểm tra xem nó đã có trong obj chưa, nếu chưa có thì tạo ra 
        if (!obj[date]) {
            obj[date] = { hit: 0, miss: 0 }
        }
        // nếu mà trúng thầu thì hit + 1
        if (dataItem.result == 'Trúng thầu') {
            obj[date].hit += 1
            return
        }
        // nếu mà trượt thầu thì miss + 1
        if (dataItem.result == 'Trượt thầu') {
            obj[date].miss += 1
            return
        }
    });

    // Lặp qua objt tổng đó để lấy ra được các danh sách mà mình cần.
    for (const key in obj) {
        labels.push(key);
        hits.push(obj[key].hit);
        mises.push(obj[key].miss);
    }

    return {
        labels,
        hits,
        mises
    }
}

var draw_test_03 = async function () {
    // Nhận các dữ liệu đã được convert để xử lý.
    const { labels, hits, mises } = await callOnlineAndOfflineAndReplaceDataRawToDataset()

    // Áp nó vô cái data là oke rồi.
    var data = {
        labels: labels,
        datasets: [
            {
                label: "Trúng thầu",
                data: hits,
            },
            {
                label: "Trượt thầu",
                data: mises
            },
        ]
    }

    var options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Biểu đồ thể hiện Tổng số kết quả trúng/trượt thầu qua từng năm',
                position: 'bottom'
            }
        },
    };

    // vẽ thôi...
    do_gl_create_chart_bar("#div_chart_03", "bar", data, options);
}



function quickSort(arr) {
if (arr.length <= 1) {
    return arr;
}

const pivot = arr[arr.length - 1];
const left = [];
const right = [];

for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].count < pivot.count) {
        left.push(arr[i]);
        continue
    }
    right.push(arr[i]);
}

return [...quickSort(left), pivot, ...quickSort(right)];
}

// Hàm gọi và xử lý dữ liệu về lại dataset
const callProvinceAndReplaceDataRawToDataset = async () => {
const labels = [], datas = []

// gửi yêu cầu đến server
const responseData = await fetch('http://localhost:8081/province')

// lấy ra dữ liệu ban đầu
const dataRaw = await responseData.json() ?? [];

const dataSorted = quickSort(dataRaw).reverse()

for (let i = 1; i <= 5; i++) {
    labels.push(dataSorted[i].name)
    datas.push(dataSorted[i].count)
}

return {
    labels,
    datas,
}
}

var draw_test_04 = async function () {
// Nhận các dữ liệu đã được convert để xử lý.
const { labels, datas } = await callProvinceAndReplaceDataRawToDataset()

// Áp nó vô cái data là oke rồi.
var data = {
    labels: labels,
    datasets: [
        {
            label: "Tổng thầu",
            data: datas,
        },
    ]
}

var options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Biểu đồ thể hiện Top 5 tỉnh thành có gói thầu cao nhất',
            position: 'bottom'
        }
    },
};

// vẽ thôi...
do_gl_create_chart_bar("#div_chart_04", "doughnut", data, options);
}

var draw_test_05 = function () {
var data = {
    labels: [
        "CÔNG TY TNHH THƯƠNG MẠI ĐÔNG NAM", "Tổng Công ty cổ phần Bảo hiểm Bưu điện", "Tổng Công ty Bảo hiểm PVI", 
        "Tổng công ty cổ phần bảo hiểm quân đội", "Tổng Công ty Bảo hiểm Bảo Việt", 
        "CÔNG TY CỔ PHẦN THIẾT BỊ ĐIỆN TUẤN ÂN",
        "TỔNG CÔNG TY CỔ PHẦN BẢO MINH", "Tổng Công ty cổ phần bảo hiểm Petrolimex", "CÔNG TY TNHH NHẬT LINH ĐÀ NẴNG",
        "CÔNG TY TNHH THIẾT BỊ MINH TÂM",
],
    datasets: [
        {
            label: "Gói thầu đã đấu",
            data: [4621, 4343, 4261, 2996, 2847, 2720, 2663, 2584, 2492, 2424],
        },
    ]
}

var options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Biểu đồ thể hiện top 10 nhà thầu dự thầu nhiều nhất',
            position: 'bottom'
        },
    },
};

// vẽ thôi...
do_gl_create_chart_bar("#div_chart_05", "bar", data, options);
}

var draw_test_06 = function () {
var data = {
    labels: [
        "Tổng Công ty Bảo hiểm PVI", "Tổng Công ty cổ phần Bảo hiểm Bưu điện", "Tổng Công ty Bảo hiểm Bảo Việt",
        "CÔNG TY TNHH THIẾT BỊ MINH TÂM", "CÔNG TY TNHH TƯ VẤN XÂY DỰNG HƯNG THỊNH", "TỔNG CÔNG TY CỔ PHẦN BẢO MINH",
        "Tổng công ty cổ phần bảo hiểm quân đội", "CÔNG TY TNHH TƯ VẤN XÂY DỰNG AN LỘC NINH THUẬN",
        "CÔNG TY TNHH THIẾT BỊ Y TẾ PHƯƠNG ĐÔNG", "Tổng Công ty cổ phần bảo hiểm Petrolimex",
    ],
    datasets: [
        {
            label: "Gói thầu đã trúng",
            data: [2705, 2449, 2157, 2035, 1948, 1876, 1828, 1564, 1495, 1461],
        },
    ]
}

var options = {
    responsive: true,
    // indexAxis: 'y',
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Biểu đồ thể hiện top 10 nhà thầu trúng thầu nhiều nhất',
            position: 'bottom'
        },
    },
};

// vẽ thôi...
do_gl_create_chart_bar("#div_chart_06", "bar", data, options);
}

var draw_test_07 = function () {
var data = {
    labels: [
        "CÔNG TY TNHH THƯƠNG MẠI ĐÔNG NAM", "CÔNG TY TNHH NHẬT LINH ĐÀ NẴNG",
        "CÔNG TY TNHH MỘT THÀNH VIÊN MỘC NHẬT MINH", "Tổng Công ty cổ phần Bảo hiểm Bưu điện",
        "CÔNG TY TNHH NGỌC KHÁNH", "CÔNG TY CỔ PHẦN THIẾT BỊ ĐIỆN TUẤN ÂN", "CÔNG TY CỔ PHẦN THIẾT BỊ ĐIỆN SÀI GÒN",
        "CÔNG TY TNHH MỘT THÀNH VIÊN KHOA HỌC VÀ CÔNG NGHỆ NĂNG LƯỢNG XANH", "Tổng Công ty Bảo hiểm PVI",
        "CÔNG TY CỔ PHẦN IN HÀ NỘI"
    ],
    datasets: [
        {
            label: "Gói thầu đã trượt",
            data: [3206, 2072, 1587, 1518, 1310, 1277, 1262, 1223, 1202, 1028],
        },
    ]
}

var options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Biểu đồ thể hiện top 10 nhà thầu trượt thầu nhiều nhất',
            position: 'bottom'
        },
    },
};

// vẽ thôi...
do_gl_create_chart_bar("#div_chart_06", "bar", data, options);
}