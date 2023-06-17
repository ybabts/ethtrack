type CryptoData = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
};

type CryptoApiResponse = {
  data: CryptoData[];
};

export async function fetchCryptoPrices(): Promise<CryptoApiResponse> {
  const apiURL = "https://api.coincap.io/v2/assets";
  const response = await fetch(apiURL);
  const data: CryptoApiResponse = await response.json();
  return data;
}

export async function getEthereumPrice(): Promise<Array<string>> {
  const result: Array<string> = [];
  const apiData = await fetchCryptoPrices();
  for (let i = 0; i < apiData["data"].length; i++) {
    if (apiData["data"][i]["symbol"] === "ETH") {
      const price = apiData["data"][i]["priceUsd"];
      result.push("ETH");
      result.push(price);
    }
  }
  console.log(result);
  return result;
}

export default getEthereumPrice;
