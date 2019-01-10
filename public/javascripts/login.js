$(document).ready(() => {

$('#btn-submit').on('click', (e) => {
	e.preventDefault();
	let data = {
		email: $('#email-input').val(),
		pass: $('#pass-input').val(),
	}
	$.ajax({
		url: '/users/login',
		method: 'POST',
		data: data,
	}).done((response) => {
		if (response != 'false') {
			localStorage.setItem('user_id', response);
			window.location.href = '/views/dashboard.html';
		} else err_msg('username or password is invalid');

	});
});

function err_msg(txt) {
	$(".invalid-feedback").show();
	$('.invalid-feedback').html(txt);
} 	


});	