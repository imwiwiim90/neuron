/* DATE */

function daysInMonth(date) {
	return new Date(date.getFullYear(),date.getMonth(),0).getDate();
}

function pick_random(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}