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
		error: (req,status,error) => {
			err_msg("Usuario o contraseña invalidos");
		}
	}).done((response) => {
		if (response != 'false') {
			localStorage.setItem('user_id', response);
			window.location.href = '/views/dashboard.html';
		} else err_msg('username or password is invalid');
	});
});

$('#email-input').on('input',() => {
	$('.invalid-feedback').hide();
});

$('#pass-input').on('input',() => {
	$('.invalid-feedback').hide();
});

function err_msg(txt) {
	$(".invalid-feedback").show();
	$('.invalid-feedback').html(txt);
} 	


});	