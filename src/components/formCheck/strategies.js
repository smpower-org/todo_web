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
    if (!/(^1[3|5|8][0-9]{9}$)/g.test(value)) return errorMsg;
  },
  isEmail(value, errorMsg) {
    if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g.test(value)) {  // 验证邮箱是否合法
      return errorMsg;
    }
  }
};

export default strategies;
