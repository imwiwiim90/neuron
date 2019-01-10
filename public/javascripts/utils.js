/* DATE */

function daysInMonth(date) {
	return new Date(date.getFullYear(),date.getMonth(),0).getDate();
}

function pick_random(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}


/* URL */ 

function getURLParam(key) {
	let query = window.location.search.substring(1);
	let tuples = query.split('&');
	for (var tuple of tuples) {
		let [k,v] = tuple.split('=');
		if (key == k) return v;
	}
}