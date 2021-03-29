/*-----   Date format   -----*/
function formatDateString(params) {
    params = params.toString()
    return params[1] ? params : `0${params}`
}

function getYYYY_MM_dd_hh_mm_ss(date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${[year,month,day].map(formatDateString).join('-')} ${[hour,minutes,seconds].map(formatDateString).join(':')}`
}


export const YYYY_MM_dd_hh_mm_ss = getYYYY_MM_dd_hh_mm_ss