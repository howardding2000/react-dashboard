export function debounce(fn, delay = 200) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

export function throttle(fn, delay = 200) {
  let flag = true;
  return function (...args) {
    if (!flag) {
      return;
    }
    flag = false;
    let timer = setTimeout(() => {
      fn.apply(this, args);
      flag = true;
      clearTimeout(timer);
    }, delay);
  };
}

export function formatDate(time) {
  const date = new Date(time);
  return <span>{date.toDateString()}</span>;
}

export const CurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
