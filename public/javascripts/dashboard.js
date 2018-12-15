var colors = ['green','red'];
			
var user_id = localStorage.getItem('user_id');


$(document).ready(() => {
	function renderGroups(groups) {
		let $container = $('#groups-list');
		let i = 0;
		for (let group of groups) {
			let $itemcont = $('<a href="/views/group.html">');
			$itemcont.append('<li>')
			$item = $itemcont.find('li');
			$item.html(group.name);
			let $dot = $(`<span class="oi oi-media-record"></span>`); 
			$dot.addClass('group-' + colors[i % colors.length]);
			$item.append($dot);
			$container.append($itemcont);
			i+=1
		}
	}
	renderGroups([]);


	let $schedule = $('.schedule');

	$.ajax({
		url: '/users/groups/' + user_id,
	}).done((groups) => {
		renderGroups(groups);
	})

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