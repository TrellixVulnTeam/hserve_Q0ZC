
const cryptoInfo = `
schema {
  query: search
}

type search {
  source: [sources]!
}

type sources { 

  coins: [coins]
}

type coins {
  id: String!
  name: String!
  symbol: String!
  available_supply: Float
  last_update: Int
  market_cap_usd: Float
  max_supply: Float
  percent_change_1h: Float
  percent_change_24h: Float
  percent_change_7D: Float
  price_btc: Float
  price_usd: Float
  total_supply: Float
  rank: Int
  front: [front]
  history: [history]
  market: [market]

}

type front {
  cap24hrChange: Float
  long: String!
  mktcap: Float 
  perc: Float
  price: Float
  shapeshift: String
  short: String!
  supply: Float
  usdVolume: Float
  volume: Float
  vwapData: Float
  vwapDataBTC: Float
}

type market {
  altCap: Float
  bitnodesCount: Int
  btcCap: Float
  btcPrice: Float
  cap24hrChange: Float
  display_name: String
  dom: Float
  id: String
  market_cap: Float
  price: Float
  price_usd: Float
  status: String
  supply: Float
  totalCap: Float
  type: String
  usdVolume: String
  volume: Float
  volumeAlt: Float
  volumeBtc: Float
  volumeTotal: Float
}

  type history {  
    daily: [daily]
  }

  type daily {
    price: [timeseries]
    market_cap: [timeseries]
    volume: [timeseries]
  }

  type timeseries {
    time: Float!
    data: Float!
  }

`;

export default cryptoInfo;