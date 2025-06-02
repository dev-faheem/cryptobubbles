export const currencies = [
  { symbol: "$", label: "USD", value: "USD" },
  { symbol: "€", label: "EUR", value: "EUR" },
  { symbol: "£", label: "GBP", value: "GBP" },
  { symbol: "R$", label: "BRL", value: "BRL" },
  { symbol: "$", label: "CAD", value: "CAD" },
  { symbol: "$", label: "AUD", value: "AUD" },
  { symbol: "Zł", label: "PLN", value: "PLN" },
  { symbol: "₹", label: "INR", value: "INR" },
  { symbol: "₽", label: "RUB", value: "RUB" },
  { symbol: "Fr", label: "CHF", value: "CHF" },
  { symbol: "R", label: "ZAR", value: "ZAR" },
  { symbol: "₺", label: "TRY", value: "TRY" },
  { symbol: "¥", label: "JPY", value: "JPY" },
  { symbol: "₩", label: "KRW", value: "KRW" },
];

export const cryptos = [
  { symbol: "₿", label: "BTC", value: "BTC" },
  { symbol: "Ξ", label: "ETH", value: "ETH" },
  { symbol: "◎", label: "SOL", value: "SOL" },
];

export const cryptoList = [
  { name: "Bitcoin (BTC)", image: "/1.png" },
  { name: "Ethereum (ETH)", image: "/eth.png" },
  { name: "Tether (USDT)", image: "/tet.png" },
  { name: "XRP (XRP)", image: "/xrp.png" },
  { name: "BNB (BNB)", image: "/bnb.png" },
  { name: "Solana (SOL)", image: "/solana.png" },
  { name: "USDC (USDC)", image: "/usd.png" },
  { name: "Dogecoin (DOGE)", image: "/doge.png" },
  { name: "Cardano (ADA)", image: "/card.png" },
];

export const languageOptions = [
  {
    title: "",
    option: [
      {
        label: "English",
        value: "English",
        img: "/flags/usa.png",
      },
      {
        label: "Français",
        value: "Français",
        img: "/flags/france.png",
      },
      {
        label: "Portugues",
        value: "Portugues",
        img: "/flags/portugal.png",
      },
      {
        label: "Deutsch",
        value: "Deutsch",
        img: "/flags/germany.png",
      },
      {
        label: "Русский",
        value: "Русский",
        img: "/flags/russian-federation.png",
      },
      {
        label: "Polski",
        value: "Polski",
        img: "/flags/poland.png",
      },
      {
        label: "Español",
        value: "Español",
        img: "/flags/spain-flag.png",
      },
      {
        label: "فارسی",
        value: "فارسی",
        img: "/flags/iran.png",
      },
      {
        label: "Italian",
        value: "Italian",
        img: "/flags/italy.png",
      },
      {
        label: "Nederlands",
        value: "Nederlands",
        img: "/flags/netherlands.png",
      },
      {
        label: "Українська",
        value: "Українська",
        img: "/flags/ukraine.png",
      },
      {
        label: "العربية",
        value: "العربية",
        img: "/flags/saudi-arabia.png",
      },
      {
        label: "Türkçe",
        value: "Türkçe",
        img: "/flags/turkey.png",
      },
      {
        label: "ไทย",
        value: "ไทย",
        img: "/flags/thailand.png",
      },
      {
        label: "日本語",
        value: "日本語",
        img: "/flags/japan.png",
      },
      {
        label: "简体中文",
        value: "简体中文",
        img: "/flags/china.png",
      },
      {
        label: "Čeština",
        value: "Čeština",
        img: "/flags/czech-republic.png",
      },
    ],
  },
];

export const ColorOptions = [
  {
    title: "",
    option: [
      {
        label: "Red + Green",
        value: "Red + Green",
        img: "/red-green.svg",
      },

      {
        label: "Yellow + Blue",
        value: "Yellow + Blue",
        img: "/yellow-blue.svg",
      },
    ],
  },
];

export const SubCoinOptions = [
  {
    title: "",
    option: [
      {
        label: "Show",
        value: "Show",
        img: "/eye.png",
      },

      {
        label: "Hide",
        value: "Hide",
        img: "/hide-eye.png",
      },
    ],
  },
];

export const CurrencyOptions = [
  {
    title: "Fiat",
    option: currencies,
  },
  {
    title: "Crypto",
    option: cryptos,
  },
];
