$(document).ready(() => {

	let $schedule = $('.schedule');

	function create($schedule) {
		let days = ['s','m','t','w','t','f','s'];
		let $thead = $schedule.find('thead > tr');
		$thead.html('');
		for (let day of days) {
			let $th = $('<th>');
			$th.html(day);
			$thead.append($th);
		}
	}


	function render($schedule,date) {
		date = new Date(date);
		let month = date.getMonth();
		let year = date.getFullYear();

		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
		let $title = $schedule.find('.title');
		$title.html(`${months[month]} ${year}`)



		let $tbody = $('.schedule tbody');
		$tbody.html('');
		date.setDate(1);
		date.setDate(date.getDate() - date.getDay());
		let $tr = $('<tr>');
		while (date.getDate() != 2 || date.getMonth() == month) {
			let $td = $('<td>');
			$td.html(date.getDate());
			$td.addClass('date-' + date.getDate());
			$tr.append($td);
			if (date.getMonth() != month) $td.addClass('invalid');
			if (date.getDay() == 6) {
				$tbody.append($tr);
				$tr = $('<tr>');
			}
			date.setDate(date.getDate() + 1);
		}

	}

	function updateData($schedule,groups) {
		let i = 0;
		for (let group of groups) {
			let date = group.date;
			let $td = $schedule.find('.date-' + date);
			$td.append('<br>');
			let $dot = $(`<span class="oi oi-media-record"></span>`); 
			$dot.addClass('group-' + colors[i % colors.length]);
			$td.append($dot);
			i++;
		}
	}

	let date = new Date();
	create($schedule);
	render($schedule,date);
	updateData($schedule,appdata.groups);

	$schedule.find('.next-month').on('click',() => {
		date.setMonth(date.getMonth() + 1);
		render($schedule,date);
		updateData($schedule,appdata.groups);
	});
	$schedule.find('.prev-month').on('click',() => {
		date.setMonth(date.getMonth() - 1);
		render($schedule,date);
		updateData($schedule,appdata.groups);
	})
})