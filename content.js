/*
 * START Configuration
 */

const defaultRates = {
  AUD: 1.2846,
  BGN: 1.6388,
  BRL: 3.3095,
  CAD: 1.261,
  CHF: 0.98073,
  CNY: 6.536,
  CZK: 21.489,
  DKK: 6.2389,
  GBP: 0.74382,
  HKD: 7.8158,
  HRK: 6.2942,
  HUF: 260.01,
  IDR: 13562.0,
  ILS: 3.4785,
  INR: 64.08,
  JPY: 112.9,
  KRW: 1069.5,
  MXN: 19.664,
  MYR: 4.0665,
  NOK: 8.268,
  NZD: 1.4124,
  PHP: 49.909,
  PLN: 3.5033,
  RON: 3.8981,
  RUB: 57.649,
  SEK: 8.2497,
  SGD: 1.338,
  THB: 32.62,
  TRY: 3.8092,
  ZAR: 12.345,
  EUR: 0.83794
};

const userCurrency = "EUR";

// END Configuration

/*
 */
let usdRates = defaultRates;
let lastTarget = null;

// Fetch current USD exchange rates
fetch("https://api.fixer.io/latest?base=USD")
  .then(resp => resp.json())
  .then(
    fixerRates =>
      (usdRates =
        fixerRates && fixerRates.rates ? fixerRates.rates : defaultRates)
  )
  .catch(err => console.log(`Unable to fetch updated rates: ${err}`));

document.addEventListener(
  "mousemove",
  e => {
    const target = e.target;
    if (lastTarget != target) {
      lastTarget = target;
      if (
        (target.nodeName == "SPAN" || target.nodeName == "STRONG") &&
        target.textContent
      ) {
        const price = Number(target.textContent.replace(/[^0-9\.]+/g, ""));
        if (price) {
          const tooltipPrice = price * usdRates[userCurrency];
          target.setAttribute("title", `€${tooltipPrice.toFixed(2)}`);
        }
      }
    }
  },
  false
);
