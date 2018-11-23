var colors = ['green','red'];

$(document).ready(() => {
	function renderGroups(groups) {
		let $container = $('#groups-list');
		let i = 0;
		for (let group of groups) {
			let $item = $('<li>');
			$item.html(group.name);
			let $dot = $(`<span class="oi oi-media-record"></span>`); 
			$dot.addClass('group-' + colors[i % colors.length]);
			$item.append($dot);
			$container.append($item);
			i+=1
		}
	}
	renderGroups(appdata.groups);

	let $schedule = $('.schedule');


	Schedule.create($schedule,new Date(),updateData);
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

	updateData($schedule,appdata.groups);


});