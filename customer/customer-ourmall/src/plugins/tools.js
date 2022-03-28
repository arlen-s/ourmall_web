export const queryUrlParam = name => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substring(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return null
    }
  }
  
  export const dateDiff = (startDate, endDate = new Date()) => {
    let date = {}
    if (startDate) {
      startDate = new Date(startDate).getTime()
      endDate = endDate.getTime()
      date = timerStampDiff(startDate, endDate)
    }
    return date
  }
  export const timerStampDiff = (start, end = Date.now()) => {
    let date = {}
    if (start) {
      const timerStamp = {
        dd: 24 * 3600 * 1000,
        hh: 3600 * 1000,
        mm: 60 * 1000,
        ss: 1000,
        ms: 1,
      }
      let timer = Math.abs(end - start)
      for (let type in timerStamp) {
        date[type] = Math.floor(timer / timerStamp[type])
        timer = timer % timerStamp[type]
      }
    }
    return date
  }
  export const printLog = (title, obj) => {
    console.log(
      `%c ${title}:`,
      'color:green;font-size: 12px;font-weight: bold;text-decoration: underline;',
      JSON.stringify(obj)
    )
  }
  