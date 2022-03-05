// Console API to clear console before logging new data 
console.API;
if (typeof console._commandLineAPI !== 'undefined') {
    console.API = console._commandLineAPI; //chrome
} else if (typeof console._inspectorCommandLineAPI !== 'undefined'){
    console.API = console._inspectorCommandLineAPI; //Safari
} else if (typeof console.clear !== 'undefined') {
    console.API = console;
}


const itemList = document.getElementById('itemList')['children'];
var itemCount = itemList.length;

// Extracts data from kinopoisk list
function getFilmsData() {
    console.API.clear();

    let filmsObj = {};


    for (let i = 0; i < itemCount; i++) {
        filmsObj[i] = {
            'movie_id': itemList[i]['attributes'][2].value,
            'movie_name': itemList[i]['children'][5]['children'][0]['innerText']
        };
        // filmsObj.id['movie_id'] = [itemList[i]['attributes'][2].value];
        console.log(itemList[i]['attributes'][2].value);
    }
    console.save(filmsObj);
}

console.save = function (data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }

    if (!filename) filename = 'movies.json'

    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

getFilmsData();