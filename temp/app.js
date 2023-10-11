const a = document.querySelectorAll(".bidding-table tbody tr");
let arr = [];

const arr1 = [{
    i: 0,
    a: [
        ".bidding-code",
        "name"
    ]
}, {
    i: 1,
    a: [
        ".solicitor-code",
        "bidding"
    ]
}, {
    i: 2,
    a: "date"
}, {
    i: 3,
    a: [
        {
            e: ".margin-bottom",
            l: [
                "stat",
                "investor"
            ]
        }
    ]
}
];

a.forEach(e => {
    const tdlist = e.querySelectorAll("td");
    const p = {};

    const f = (id, arr, par) => {
        if(typeof arr == 'object') {
            arr.forEach((c, i) => {
                let attr = ""
                if(typeof c == 'string') {
                    attr = c.trim();
                }
    
                if(typeof c == 'string' && attr != "") {
                    if(attr.startsWith(".") || attr.startsWith("#")) {
                        p[attr.substring(1)] = $(par[id]).find(attr).text();
                        $(par[id]).find(attr).remove();
                    } else {
                        p[attr] = $(par[id]).children(i).text();
                    }
                }
            })
        }
    }

    arr1.forEach(l => {
        f(l.i, l.a, tdlist);

        p[l.a[l.a.length - 1]] = tdlist[l.i].textContent.replace(/(?:\r\n|\r|\n)/g, "").trim();
    })
    arr.push(p)
});

console.log('====================================');
console.log(arr);
console.log('====================================');