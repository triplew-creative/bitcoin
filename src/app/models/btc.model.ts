export interface IPriceTickerApi
{
    BTC: IBtcPrice;
}
export interface IPriceTicker
{
    asset: 'BTC',
    values: IBtcPrice;
}
export interface IBtcPrice
{
    all_time_high: number;
    buy: number;
    sell: number;
}

export interface IFunds
{
    available_aud: number;
}


export interface IEstimate
{
    spending_amount: number,
    price_estimated: number;
    buy_amount_estimated: number;
}

export interface IBtcBuy
{
    asset: 'BTC',
    price: number;
    amount: number;
}

