/* DATE */

function daysInMonth(date) {
	return new Date(date.getFullYear(),date.getMonth(),0).getDate();
}