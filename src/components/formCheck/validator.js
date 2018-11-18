import strategies from './strategies';

class Validator {
  constructor() {
    this.cache = [];
  }

  add(value, rules) {  // 添加验证规则
    const self = this;  // 保存当前 this

    rules.forEach((item, index) => {
      (item => {
	const strategyArr = item.strategy.split(':');  // 把 strategy 和参数分开
	const errorMsg = item.errorMsg;
	self.cache.push(() => {
	  const strategy = strategyArr.shift().trim();  // 用户挑选的 strategy
	  strategyArr.unshift(value.trim());  // 把 value 值添加经参数列表
	  strategyArr.push(errorMsg);  // 把 errorMsg 添加进参数列表
	  return strategies[strategy](...strategyArr);
	});
      })(item);
    });
  }

  start() {  // 开始校验
    for (let i = 0, len = this.cache.length; i < len; i++) {
      const msg = this.cache[i]();
      if (msg) return msg;  // 若 msg 存在，则说明校验未通过
    }
  }
}

export default Validator;
