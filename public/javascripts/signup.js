$(document).ready(() => {

	$btn = $('#submit-btn');

	$btn.on('click', ()=> {
		let data = validate();
		if (!(typeof data === 'string'))
			$.ajax({
				url: '/users/signup',
				method: 'post',
				data: data,
				done: (response) => {
					window.location.href = '/views/index.html';
				},
				error: (req,status,err) => {
					console.log(req.responseJSON.message);
					err_msg('email already exist');
				}
			});
		else err_msg(data);
	});

	function validate() {
		let username = $('#username-input').val();
		let pass = $('#pass-input').val();
		let confirm_pass = $('#confirm-pass-input').val();
		let email = $('#email-input').val();

		if (pass != confirm_pass) return "Las contraseñas son diferentes";
		if (username == '') return "Por favor escoja un Nombre de usuario";
		if (email == '') return "Por favoe inserte el correo electrónico";
		return {
			user: username,
			email: email,
			pass: pass,
		};
	}

	function err_msg(txt) {
		$(".invalid-feedback").show();
		$('.invalid-feedback').html(txt);
	}
});