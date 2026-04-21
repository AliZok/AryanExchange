import { NextResponse } from 'next/server';

// CoinGecko API - Free tier, no API key required
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Default cryptocurrencies to fetch
const DEFAULT_CRYPTOS = [
  'bitcoin',      // BTC
  'ethereum',     // ETH
  'tether',       // USDT
  'tron',         // TRX
  'litecoin',     // LTC
];

export async function GET() {
  try {
    // Fetch prices from CoinGecko API
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${DEFAULT_CRYPTOS.join(',')}&vs_currencies=usd&include_24hr_change=true`,
      {
        headers: {
          'User-Agent': 'AryanExchange/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to match our format
    const cryptoPrices = Object.entries(data).map(([id, priceData]) => {
      const cryptoInfo = getCryptoInfo(id);
      return {
        id: id,
        symbol: cryptoInfo.symbol,
        name: cryptoInfo.name,
        name_fa: cryptoInfo.name_fa,
        price_usd: priceData.usd,
        price_irt: Math.round(priceData.usd * 420000), // Convert USD to IRR (approximate rate)
        change_24h: priceData.usd_24h_change || 0,
        icon: cryptoInfo.icon,
        last_update: new Date().toISOString()
      };
    });

    return NextResponse.json({
      success: true,
      data: cryptoPrices,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    
    // Return fallback data if API fails
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch crypto prices',
      data: getFallbackData()
    }, { status: 500 });
  }
}

function getCryptoInfo(id) {
  const cryptoMap = {
    'bitcoin': { symbol: 'BTC', name: 'Bitcoin', name_fa: 'بیت‌کوین', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    'ethereum': { symbol: 'ETH', name: 'Ethereum', name_fa: 'اتریوم', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    'tether': { symbol: 'USDT', name: 'Tether', name_fa: 'تتر', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png' },
    'binancecoin': { symbol: 'BNB', name: 'Binance Coin', name_fa: 'بایننس کوین', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
    'cardano': { symbol: 'ADA', name: 'Cardano', name_fa: 'کاردانو', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png' },
    'solana': { symbol: 'SOL', name: 'Solana', name_fa: 'سولانا', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    'polkadot': { symbol: 'DOT', name: 'Polkadot', name_fa: 'پولکادات', icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' },
    'dogecoin': { symbol: 'DOGE', name: 'Dogecoin', name_fa: 'دوج‌کوین', icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png' },
    'avalanche-2': { symbol: 'AVAX', name: 'Avalanche', name_fa: 'آوالانچ', icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png' },
    'chainlink': { symbol: 'LINK', name: 'Chainlink', name_fa: 'چین‌لینک', icon: 'https://cryptologos.cc/logos/chainlink-link-logo.png' },
    'polygon': { symbol: 'MATIC', name: 'Polygon', name_fa: 'پالیگان', icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png' },
    'tron': { symbol: 'TRX', name: 'Tron', name_fa: 'ترون', icon: 'https://cryptologos.cc/logos/tron-trx-logo.png' },
    'litecoin': { symbol: 'LTC', name: 'Litecoin', name_fa: 'لایت‌کوین', icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png' },
    'stellar': { symbol: 'XLM', name: 'Stellar', name_fa: 'استلار', icon: 'https://cryptologos.cc/logos/stellar-xlm-logo.png' },
    'cosmos': { symbol: 'ATOM', name: 'Cosmos', name_fa: 'کازموس', icon: 'https://cryptologos.cc/logos/cosmos-atom-logo.png' }
  };

  return cryptoMap[id] || { symbol: id.toUpperCase(), name: id, name_fa: id, icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' };
}

function getFallbackData() {
  return [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      name_fa: 'بیت‌کوین',
      price_usd: 70000,
      price_irt: 70000 * 420000,
      change_24h: 2.5,
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      last_update: new Date().toISOString()
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      name_fa: 'اتریوم',
      price_usd: 2500,
      price_irt: 2500 * 420000,
      change_24h: 1.8,
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      last_update: new Date().toISOString()
    }
  ];
}
