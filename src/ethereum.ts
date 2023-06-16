export async function fetchCryptoPrices(): Promise<Object> {
    const apiURL = 'https://api.coincap.io/v2/assets';
    let response = await fetch(apiURL);
    let data: Object = response.json();
    return data;
}

export async function getEthereumPrice(): Promise<Array<string>> {
    let result: Array<string> = [];
    let apiData = await fetchCryptoPrices();
    for (let i = 0; i < apiData['data'].length; i++){
        if (apiData['data'][i]['symbol'] === 'ETH'){
            let price: string = apiData['data'][i]['priceUsd'];
            result.push('ETH');
            result.push(price);
        }
        else {}
    }
    console.log(result);
    return result;
}

export default {
    getEthereumPrice
};