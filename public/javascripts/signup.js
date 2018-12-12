$(document).ready(() => {

	$btn = $('#submit-btn');

	$btn.on('click', ()=> {
		let data = validate();
		if (!(typeof data === 'string'))
			$.ajax({
				url: '/users/signup',
				method: 'post',
				data: data,
			}).done( (response) => {
				if (response == 'false') err_msg('Username already exist, please choose another one');
				else window.location.href = '/views/index.html';


			})
		else err_msg(data);
	});

	function validate() {
		let username = $('#email-input').val();
		let pass = $('#pass-input').val();
		let confirm_pass = $('#confirm-pass-input').val();

		if (pass != confirm_pass) return "Passwords are different";
		if (username == '') return "Please choose a username";
		return {
			user: username,
			pass: pass,
		};
	}

	function err_msg(txt) {
		$(".invalid-feedback").show();
		$('.invalid-feedback').html(txt);
	}
});