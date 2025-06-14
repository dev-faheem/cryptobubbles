import { CoingeckoCoinData } from "@/types/coingecko.type";
import Bubbles from "./ui/Bubbles";
import MarketInfo from "./ui/MarketInfo";
export const dynamic = "force-dynamic";

const STABLECOIN_IDS = ["tether", "usd-coin", "true-usd", "binance-usd", "paxos-standard", "first-digital-usd", "paypal-usd", "euro-coin", "usd1", "dai", "dai-on-pulsechain"];

async function getCoins(): Promise<CoingeckoCoinData[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/" +
      "coins/markets?" +
      "vs_currency=usd" +
      `&ids=${STABLECOIN_IDS.join(",")}` + // Add the specific coin IDs
      "&order=market_cap_desc" +
      "&per_page=250" +
      `&page=${1}` +
      "&sparkline=true" +
      "&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y" +
      "&locale=en" +
      `&x_cg_demo_api_key=${process.env.COINGECKO_API_SECRET_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch stablecoins: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export default async function Main() {
  const stablecoins = await getCoins();
  return (
    <>
      <Bubbles coins={stablecoins} />
      <div id="coins-table-loyout">
        <MarketInfo />
      </div>
    </>
  );
}
