// 时间格式化
export function dateFormat(fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'D+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
    ;
  }
  ;
  return fmt
}
// 秒数格式化
export function formatSeconds(value, F = ':', H = '', M = '', S = '') {
  var theTime = parseInt(value)// 秒
  var theTime1 = 0// 分
  var theTime2 = 0// 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }

  var result = '' + parseInt(theTime)// 秒
  if (theTime < 10 > 0) {
    result = '0' + parseInt(theTime)// 秒
  } else {
    result = '' + parseInt(theTime)// 秒
  }

  if (theTime1 < 10 > 0) {
    result = '0' + parseInt(theTime1) + M + F + result + S // 分，不足两位数，首位补充0，
  } else {
    result = '' + parseInt(theTime1) + M + F + result + S// 分
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2) + H + F + result// 时
  }
  return result
}

// 次数格式化
export function formatCount(count) {
  if (typeof count !== 'number') {
    return 0
  }
  return count > 10000 ? (count / 10000).toFixed(2) + '万' : count
}
