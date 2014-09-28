var CONTACT = CONTACT || [{
	name: "alex",
	email: "sashko89@ukr.net",
	cell: "0537406119",
	group: "Karate team"
}, {
	name: "babushka",
	email: "babushka41@ukr.net",
	cell: "0934021192",
	group: "Family"
}, {
	name: "Ann",
	email: "ann@ukr.net",
	cell: "0637402113",
	group: "Most awesome"
}, {
	name: "Sergey",
	email: "sergey@ukr.net",
	cell: "0974021900",
	group: "Coleagues"
}]
// renders contact preview info on the left
function render_contacts_list(){
  var li = 0;
  var li_html = '<div class="contacts">';
  while(li < CONTACT.length) {
    li_html += '<div class="contact-profile col-xs-12"><img class="contact-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8zSOldlUoIBJOkl34ZcWHcCb-n7AvrIitR7eSyKEzZxwI8OdBC09wg" alt="icon"><div class="name">' + CONTACT[li].name + '</div></div>';
    li++;
  }
  li_html += '</div>';
  $('.contacts').replaceWith(li_html);
}
// filles in preview form with basic contacts from array of objects
function get_db_contact(name){
	var i = 0;
	while(i < CONTACT.length) {
		if(name == CONTACT[i].name){
			var db_contact = CONTACT[i];
			return db_contact;
		}
		i++;
	}
}
// render selected contact detailed info on the right
$(document).on('click', '.contact-profile', function(){
	var name = $(this).find('.name').text();
	var current_contact = get_db_contact(name);
	$('.contact-name').text(current_contact.name);
	$('.num').text(current_contact.cell);
	$('.email').text(current_contact.email);
	$('#information').removeClass('hidden');
	$(this).addClass('highlight').siblings().removeClass('highlight');
	$('.btn-danger').removeClass('hidden');
	$('.btn-warning').removeClass('hidden');
});
// remove selected contact with class highlight
$(document).on('click', '.btn-danger', function(){
	if (confirm("Are you sure?")) {
		$('.highlight').remove();
		$('#information').addClass('hidden');
		$('.btn-danger').addClass('hidden');
		$('.btn-warning').addClass('hidden');
	}
    return false;
});
// submits and validates all the inputs of newly created contact, adding it to the preview list
$(document).on('click', '#submit_form', function(){
	var inputName = $('#inputName').val();
	var inputEmail = $('#inputEmail').val();
	var inputMobile = $('#inputMobile').val();
	var inputGroup = $('#inputGroup').val();
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	var phone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	if(!inputName) {
		if($('.name-error').length < 1) {
			$('#inputName').addClass('error').after('<span class="name-error">name should not be blank</span>');
		}
	}else if(!inputEmail || !pattern.test(inputEmail)){
		$('.name-error').remove();
		$('#inputName').removeClass('error');
		if($('.email-error').length < 1) {
			$('#inputEmail').addClass('error').after('<span class="email-error">Please provide valid email</span>');
		}
	}else if(!inputMobile || !phone.test(inputMobile)){
		$('#inputName').removeClass('error');
		$('.name-error').remove();
		$('.email-error').remove();
		$('#inputEmail').removeClass('error');
		if($('.tel-error').length < 1) {
			$('#inputMobile').addClass('error').after('<span class="tel-error">Please add contact\'s cell number</span>');
		}
	}else{
		$('.tel-error').remove();
		$('input').removeClass('error');
		CONTACT.push({
			name: inputName,
			email: inputEmail,
			cell: inputMobile,
			group: inputGroup
		});
		render_contacts_list();
		$('#myModal').modal('hide');
	}
});
// gets the info of selected contact, renders modal with that contact info already in the form
$(document).on('click', '.btn-warning', function(){
	if($('.contact-profile').hasClass('highlight')) {
		$('#myModal').modal('show');
		$('.btn-info').attr('id', 'update_form').text('Update');
		var name = $('.highlight .name').text();
		var current_contact = get_db_contact(name);
		$('#inputName').val(current_contact.name);
		$('#inputEmail').val(current_contact.email);
		$('#inputMobile').val(current_contact.cell);
		$('#inputGroup').val(current_contact.group);
	}
});
// updates the form with edited info of the contact
$(document).on('click', '#update_form', function(){
	var inputName = $('#inputName').val();
	var inputEmail = $('#inputEmail').val();
	var inputMobile = $('#inputMobile').val();
	var inputGroup = $('#inputGroup').val();
	var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	var phone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	if(!inputName) {
		if($('.name-error').length < 1) {
			$('#inputName').addClass('error').after('<span class="name-error">name should not be blank</span>');
		}
	}else if(!inputEmail || !pattern.test(inputEmail)){
		$('.name-error').remove();
		$('#inputName').removeClass('error');
		if($('.email-error').length < 1) {
			$('#inputEmail').addClass('error').after('<span class="email-error">Please provide valid email</span>');
		}
	}else if(!inputMobile || !phone.test(inputMobile)){
		$('.name-error').remove();
		$('#inputName').removeClass('error');
		$('.email-error').remove();
		$('#inputEmail').removeClass('error');
		if($('.tel-error').length < 1) {
			$('#inputMobile').addClass('error').after('<span class="tel-error">Please add contact\'s cell number</span>');
		}
	}else{
		$('.tel-error').remove();
		$('input').removeClass('error');
		for (var i in CONTACT) {
			if (CONTACT[i].name == $('.highlight .name').text()) {
				CONTACT[i] = {
					name: inputName,
					email: inputEmail,
					cell: inputMobile,
					group: inputGroup
				}
			}
		}
		render_contacts_list();
		$('#myModal').modal('hide');
		$('#information').addClass('hidden');
		$('.btn-danger').addClass('hidden');
		$('.btn-warning').addClass('hidden');
	}
});

// search filter
$('#search').keyup(function(){
	var filter = $(this).val();
	$('.contacts .contact-profile').each(function(){
		if($(this).text().search(new RegExp(filter, "i")) < 0) {
			$(this).fadeOut();
		}else{
			$(this).show();
		}
	});
	$('#information').addClass('hidden');
	$('.contact-profile').removeClass('highlight');
	$('.btn-danger').addClass('hidden');
	$('.btn-warning').addClass('hidden');
});
// group filter
$(document).on('click', '.dropdown-menu li a', function(){
	var active_group = $(this).text();
	$('.active_group').text(active_group);
	for (var i in CONTACT) {
		if (CONTACT[i].group == active_group) {
			$('.contact-profile ').eq(i).show();
		}else{
			$('.contact-profile ').eq(i).fadeOut();
		}
	}
	$('#information').addClass('hidden');
	$('.contact-profile').removeClass('highlight');
	$('.btn-danger').addClass('hidden');
	$('.btn-warning').addClass('hidden');
});
// clears the modal form every time after it is being closed
$('#myModal').on('hidden.bs.modal', function () {
	$('input').val('');
	$('.btn-info').attr('id', 'submit_form').text('Submit');
});
render_contacts_list();