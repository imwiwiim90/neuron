var user_id = localStorage.getItem('user_id');

function validate() {
	let valid = true;
	let group_name = $('#group-name').val();
	if (group_name == '') {
		valid = false;
		$('#invalid-name').show();
	}
	return valid;
}

function createGroup(name) {
	let data = {
		name: name,
		user_id: user_id,
	}
	console.log(data);
	$.ajax({
		url: '/groups/new/',
		method: 'POST',
		data: data,
	}).done(() => {
		window.location.href = '/views/dashboard.html'
	});
}

$(document).ready(() => {




$('#btn-create-group').on('click',() => {
	let name = $('#group-name').val();
	if (validate()) createGroup(name);
});



});