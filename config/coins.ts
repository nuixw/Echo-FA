interface CoinBonus {
  amount: number
  newAmount: number
  bonus: number
}

type CoinsBonus = Record<number, CoinBonus>

export const coinsBonus: CoinsBonus = {
  6550458: {
    newAmount: 100,
    bonus: 0,
    amount: 100
  },
  6550663: {
    newAmount: 200,
    bonus: 0,
    amount: 200
  },
  6550668: {
    newAmount: 360,
    bonus: 20,
    amount: 300
  },
  6550672: {
    newAmount: 625,
    bonus: 25,
    amount: 500
  },
  6550674: {
    newAmount: 1300,
    bonus: 30,
    amount: 1000
  },
  6550676: {
    newAmount: 2000,
    bonus: 33,
    amount: 1500
  },
  6550678: {
    newAmount: 2800,
    bonus: 40,
    amount: 2000
  }
}
