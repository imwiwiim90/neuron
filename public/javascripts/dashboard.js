var colors = ['green','red'];
			
var user_id = localStorage.getItem('user_id');

$(document).ready(() => {
	function renderGroups(groups) {
		let accept_btn = `<button class='btn btn-success btn-accept-invitation' groupid='{group-id}'>Accept</button>`;
		let cancel_btn = `<button class='btn btn-danger btn-cancel-invitation' groupid='{group-id}'>Cancel</button>`;

		let $container = $('#groups-list');
		$container.html('');
		let i = 0;
		for (let group of groups) {
			if (group.status === 2) {
				let $itemcont = $(`<a href="/views/group.html?id=${group.id}">`);
				$itemcont.append('<li>')
				$item = $itemcont.find('li');
				$item.html(group.name);
				let $dot = $(`<span class="oi oi-media-record"></span>`); 
				$dot.addClass('group-' + colors[i % colors.length]);
				$item.append($dot);
				$container.append($itemcont);
			} else {
				let $itemcont = $(`<a href="/views/group.html?id=${group.id}">`);
				$itemcont.append('<li>')
				$item = $itemcont.find('li');
				$item.html(group.name);
				$item.append(accept_btn.replace('{group-id}',group.id));
				$item.append(cancel_btn.replace('{group-id}',group.id));
				$container.append($itemcont);
			}
			i+=1
		}



	}


	let $schedule = $('.schedule');


	function loadGroups() {
		$.ajax({
			url: '/users/groups/' + user_id,
		}).done((groups) => {
			renderGroups(groups);
		})
	}
	loadGroups();

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

	$('#groups-list').on('click','.btn-accept-invitation',function(event) {
		event.preventDefault();
		let group_id = $(this).attr('groupid');

		$.ajax({
			url: '/groups/invite/accept/' + group_id,
			method: 'POST',
			data: {
				user_id: user_id,
			},
			success: () => {
				loadGroups();
			},
			error: () => {
				alert('error');
			}
		})
		console.log(group_id)
	});

	$('#groups-list').on('click','.btn-cancel-invitation',function(event) {
		event.preventDefault();
		let group_id = $(this).attr('groupid');

		$.ajax({
			url: '/groups/invite/cancel/' + group_id,
			method: 'POST',
			data: {
				user_id: user_id,
			},
			success: () => {
				loadGroups();
			},
			error: () => {
				alert('error');
			}
		})
		console.log(group_id)
	});
});