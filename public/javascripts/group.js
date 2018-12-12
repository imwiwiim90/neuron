var colors = ['green','red'];

$(document).ready(() => {
	let group_id = 0;
	let group = appdata.groups[group_id];

	let $schedule = $('.schedule');

	Schedule.create($schedule,new Date(),updateData);
	
	function updateData($schedule) {

		let date = group.date;
		let $td = $schedule.find('.date-' + date);
		$td.append('<br>');
		let $dot = $(`<span class="oi oi-media-record"></span>`); 
		$dot.addClass('group-' + colors[group_id % colors.length]);
		$td.append($dot);


	}
	

	updateData($schedule,appdata.groups);

	let profile_template = 
	`<li>
        <div class='mr-auto profile-img {{class}}'>
          <img src="{{img-url}}"/>
        </div>
        <p>{{name}}</p>
    </li>`;
	let no_participants = 6; 
	let radius = 150;

	let classes = ['success','danger'];
    $.ajax({
	  url: 'https://randomuser.me/api/?results=' + no_participants,
	  dataType: 'json',
	  success: function(data) {
	    console.log(data);
	    let $participants = $('#participants');
	    for (let i = 0; i < no_participants; i++) {
	    	let user = data.results[i];
	    	let angle = 2*Math.PI/no_participants*i;
	    	let template = profile_template
	    		.replace('{{img-url}}',user.picture.thumbnail)
	    		.replace('{{class}}',pick_random(classes))
	    		.replace('{{name}}',user.name.first);
	    	let $profile_cont = $(template);
	    	$profile_cont.css({
	    		top: Math.sin(angle)*radius + "px",
	    		left: Math.cos(angle)*radius + "px"
	    	})
	    	$participants.append($profile_cont);
	    }
	  }
	});
    


});