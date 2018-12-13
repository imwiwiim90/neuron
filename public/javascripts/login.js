$(document).ready(() => {

$('#btn-submit').on('click', (e) => {
	e.preventDefault();
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
		} else err_msg('username or password is invalid');
	});
});

function err_msg(txt) {
	$(".invalid-feedback").show();
	$('.invalid-feedback').html(txt);
} 	


});	