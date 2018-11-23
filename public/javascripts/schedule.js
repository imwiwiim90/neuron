var Schedule = {
	date: new Date(),
	create: function($schedule,date,update_cb) {
		this.date = date;
		let days = ['s','m','t','w','t','f','s'];
		let $thead = $schedule.find('thead > tr');
		$thead.html('');
		for (let day of days) {
			let $th = $('<th>');
			$th.html(day);
			$thead.append($th);
		}
		this.render($schedule,date);
		$schedule.find('.next-month').on('click',() => {
			date.setMonth(date.getMonth() + 1);
			Schedule.render($schedule,date);
			update_cb($schedule,appdata.groups);
		});
		$schedule.find('.prev-month').on('click',() => {
			date.setMonth(date.getMonth() - 1);
			Schedule.render($schedule,date);
			update_cb($schedule,appdata.groups);
		})
	},


	render: function($schedule,date) {
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

}