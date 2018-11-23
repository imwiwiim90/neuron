var colors = ['green','red'];

$(document).ready(() => {
	let group_id = 0;
	let group = appdata.groups[group_id];

	let $schedule = $('.schedule');

	Schedule.create($schedule,new Date(),updateData);
	
	function updateData($schedule) {

		let date = group.date;
		let $td = $schedule.find('.date-' + date);
		$td.append('<br>');
		let $dot = $(`<span class="oi oi-media-record"></span>`); 
		$dot.addClass('group-' + colors[group_id % colors.length]);
		$td.append($dot);


	}

	updateData($schedule,appdata.groups);


});