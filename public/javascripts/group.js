var colors = ['green','red'];


$(document).ready(() => {
	let group_id = getURLParam('id');


	let $schedule = $('.schedule');

	Schedule.create($schedule,new Date(),updateData);
	
	function updateData($schedule) {

		// TODO DEFAULT DATE
		let date = '12';
		let $td = $schedule.find('.date-' + date);
		$td.append('<br>');
		let $dot = $(`<span class="oi oi-media-record"></span>`); 
		$dot.addClass('group-' + colors[group_id % colors.length]);
		$td.append($dot);


	}
	

	updateData($schedule,appdata.groups);
	

	const radius = 150;
	let classes = ['success','danger'];
	const profile_template = 
	`<li>
        <div class='mr-auto profile-img {{class}}'>
          <img src="{{img-url}}"/>
        </div>
        <p>{{name}}</p>
    </li>`;
	function setParticipants(participants) {
		let $participants = $('#participants');
		let no_participants = participants.length;
	    for (let i = 0; i < no_participants; i++) {
	    	let user = participants[i];
	    	let angle = 2*Math.PI/no_participants*i - Math.PI/2;
	    	let template = profile_template
	    		.replace('{{img-url}}',user.picture)
	    		.replace('{{class}}',pick_random(classes))
	    		.replace('{{name}}',user.name);
	    	let $profile_cont = $(template);
	    	$profile_cont.css({
	    		top: Math.sin(angle)*radius + "px",
	    		left: Math.cos(angle)*radius + "px"
	    	})
	    	$participants.append($profile_cont);
	    }
	}

	

	/*
	TEST PARTICIPANTS
	let no_participants = 3; 
    $.ajax({
	  url: 'https://randomuser.me/api/?results=' + no_participants,
	  dataType: 'json',
	  success: function(data) {
	  	// TODO
	    console.log(data);
	    setParticipants(data.results);
	  }
	});
	*/

	$.ajax({
		url: '/groups/participants/' + group_id,
		dataType: 'json',
		success: function(data) {
			console.log(data);
			for (let user of data) {
				user.picture = '/images/profile.jpeg';
			}
			setParticipants(data);
		}
	})

    let $cont_new_participant = $('#container-new-participant');
	$('#btn-new-participant').on('click',() => {
		$cont_new_participant.show();
	});	
    
    $('#btn-cancel-new-participant').on('click',() => {
		$cont_new_participant.hide();
	});	


    function setErrMsg(msg) {
    	let $label = $('#txt-new-participant');
    	$label.removeClass('text-success');
    	$label.addClass('text-danger');
    	$label.html(msg);
    }
    function setSuccessMsg(msg) {
		let $label = $('#txt-new-participant');
    	$label.removeClass('text-danger');
    	$label.addClass('text-success');
    	$label.html(msg);
    }
	$('#btn-success-new-participant').on('click', () => {
		$.ajax({
			url: '/groups/invite/' + group_id,
			method: 'POST',
			data: {
				email: $('#inpt-new-participant').val(),
			},
			success: (data) => {
				console.log(data);
				setSuccessMsg('User successfully invited');
			},
			error: function (request, status, error) {
				setErrMsg(request.responseJSON.message);
		    }

		})
	});


});