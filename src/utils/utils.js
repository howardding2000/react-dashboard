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
