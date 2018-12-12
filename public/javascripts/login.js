$(document).ready(() => {

$('#btn-submit').on('click', () => {
	let data = {
		user: $('#email-input').val(),
		pass: $('#pass-input').val(),
	}
	$.ajax({
		url: '/users/login',
		method: 'POST',
		data: data,
	}).done((response) => {
		if (response == 'true') {
			window.location.href = '/views/dashboard.html';
		}
	});
});	

});	