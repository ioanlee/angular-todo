export function timestampToString(timestamp:number) {
	let d = new Date(timestamp * 1000),
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),
		dd = ('0' + d.getDate()).slice(-2),
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),
		time

	if (hh > 12) h = hh - 12
	else if (hh === 12) h = 12

	time = `${yyyy}.${mm}.${dd}, ${h}:${min} UTC`
	return time
}

export function timestampToTimeAgo(timestamp:number) {
	let d = new Date(),
		now = Math.floor(d.getTime()/1000),
		seconds = now-timestamp

	if (seconds > 10*24*3600) return timestampToString(timestamp)
	if (seconds > 5*24*3600) return `${Math.floor(seconds/(24*3600))} дней назад`
	if (seconds > 3*24*3600) return `${Math.floor(seconds/(24*3600))} дня назад`
	if (seconds > 2*24*3600) return `позавчера`
	if (seconds > 24*3600) return `вчера`
	if (seconds > 22*3600) return `${Math.floor(seconds/3600)} часа назад`
	if (seconds > 21*3600) return `${Math.floor(seconds/3600)} час назад`
	if (seconds > 5*3600) return `${Math.floor(seconds/3600)} часов назад`
	if (seconds > 2*3600) return `${Math.floor(seconds/3600)} часа назад`
	if (seconds > 3600) return `час назад`
	if (seconds > 5*60) return `${Math.floor(seconds/60)} минут назад`
	if (seconds > 2*60) return `${Math.floor(seconds/60)} минуты назад`
	if (seconds > 60) return `минуту назад`
	if (seconds > 0) return `только что`
	return timestampToString(timestamp)
}