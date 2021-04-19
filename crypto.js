const urlLatestNews = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=cae469b3890fe5f93a3e15d77d7f49725dd71e7c8deff4bf7bf0148aec130f71';
const urlTopTenCoins = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=cae469b3890fe5f93a3e15d77d7f49725dd71e7c8deff4bf7bf0148aec130f71';
const tableBody = document.querySelector('.table-body');
const radioButton1 = document.querySelector('#radio-button-1');
const radioButton2 = document.querySelector('#radio-button-2');
const radioButton3 = document.querySelector('#radio-button-3');
const coinDetails = document.querySelector('.coin-details');
const detailsImg = document.querySelector('.image-details');

// Get Request for latest news
fetch(urlLatestNews)
    .then((resp) => resp.json())
    .then((data) => {
        let dataNews = data.Data;
        cryptoNews(dataNews);
    })
    .catch((error) => {
        console.log(error);
    });

// Lates News - Help Function
cryptoNews = (data) => {
    data.forEach((element, index) => {
        if (index <= 5) {
            const cardBody = document.querySelector(`.card-body-${index}`);
            cardBody.innerHTML = `<img class="img-news" src="${element.imageurl}"> <div class="p-3"> <p class="paragraph-news"> ${element.body} </p> <div class="d-flex justify-content-between"> <a href="${element.url}" target ="_blank" class="btn btn-outline-secondary"> > View </a> <span> ${element.source_info.lang} </span> </div> </div>`;
        }
    })
}

// Get Request for table
fetch(urlTopTenCoins)
    .then((resp) => resp.json())
    .then((data) => {
        let dataCoins = data.Data;
        table(dataCoins);
        detailsListener();
    })
    .catch((error) => {
        console.log(error);
    });

// Table-help Function
table = (data) => {
    data.forEach((element, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td> ${index+1} </td> <td> <img class="img-small" src="https://www.cryptocompare.com/${element.CoinInfo.ImageUrl}"> ${element.DISPLAY.USD.FROMSYMBOL}-${element.CoinInfo.FullName} </td> <td> ${element.DISPLAY.USD.PRICE} </td> <td> <button class="radio-button2 text-white border-0 rounded"disabled> ${element.DISPLAY.USD.LASTUPDATE} </button> </td> <td> ${element.DISPLAY.USD.HIGH24HOUR} </td> <td> ${element.DISPLAY.USD.LOW24HOUR} </td> <td> ${element.DISPLAY.USD.MKTCAP} </td> <td > <button class="details text-white bg-blue more-bg border-0 px-3 py-1 rounded" data-bs-toggle="modal" href="#modal"  data-key="${element.CoinInfo.Name}" data-name="${element.CoinInfo.FullName}" data-update="${element.DISPLAY.USD.LASTUPDATE}"> More </button> </td>`
        tableBody.appendChild(tr);
    })
}

// Radio Button-Top10
radioButton1.addEventListener('click', function () {
    const coins = document.querySelectorAll('tr');
    coins.forEach((element, index) => {
        if (index <= 10) {
            element.style.visibility = 'visible';
        }
    })
})

// Radio Button-Top5
radioButton2.addEventListener('click', function () {
    const coins = document.querySelectorAll('tr');
    coins.forEach((element, index) => {
        if (index <= 5) {
            element.style.visibility = 'visible';
        }
        if (index > 5) {
            element.style.visibility = 'hidden';
        }
    })
})

// Radio Button-Top3
radioButton3.addEventListener('click', function () {
    const coins = document.querySelectorAll('tr');
    coins.forEach((element, index) => {
        if (index > 3) {
            element.style.visibility = 'hidden';
        }
    })
})

// Adding eventlistener - Button more 
detailsListener = () => {
    const details = document.querySelectorAll('.details');
    details.forEach((element) => {
        element.addEventListener('click', (event) => {
            functionFetch(event);
        })
    })
}

// Fetch click button more
functionFetch = (event) => {
    const urlModal = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${event.target.dataset.key}&tsyms=USD&api_key=cae469b3890fe5f93a3e15d77d7f49725dd71e7c8deff4bf7bf0148aec130f71`;
    fetch(urlModal)
        .then((resp) => resp.json())
        .then((data) => {
            const name = event.target.dataset.key;
            const fullName = event.target.dataset.name;
            const update = event.target.dataset.update;
            detailsImg.innerHTML = `<img class="img-details text-center" src="https://www.cryptocompare.com/${data.DISPLAY[name].USD.IMAGEURL}">`
            coinDetails.innerHTML = `<h6> ${data.RAW[name].USD.FROMSYMBOL}-${fullName}</h6> <span class="mt-3">${data.DISPLAY[name].USD.MARKET}</span> <span  class="d-block"> ${data.DISPLAY[name].USD.PRICE}</span> <span class="d-block"><i class="fa fa-arrow-up">${data.DISPLAY[name].USD.HIGHDAY}</i></span> <span><i class="fa fa-arrow-down">${data.DISPLAY[name].USD.LOWDAY}</i></span> <button class="radio-button2 text-white border-0 rounded d-block mb-3" disabled> ${update} </button>`
        })
        .catch((error) => {
            console.log(error);
        });
}