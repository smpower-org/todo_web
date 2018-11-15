const strategies = {
  isNonEmpty(value, errorMsg) {  // 验证是否为空
    if (value === '') return errorMsg;
  },
  minLength(value, length, errorMsg) {  // 验证最小长度
    if (value.length < length) return errorMsg;
  },
  maxLength(value, length, errorMsg) {  // 验证最大长度
    if (value.length > length) return errorMsg;
  },
  isMobile(value, errorMsg) {  // 验证是否为 11 位手机号码
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
  }
};

export default strategies;
