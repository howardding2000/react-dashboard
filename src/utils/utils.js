const Utils = {
  debounce(fn, delay = 200) {
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
  },
  throttle(fn, delay = 200) {
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
  },
};

export default Utils;
