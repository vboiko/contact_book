var CONTACT = CONTACT || [{
	name: "alex",
	email: "sashko89@ukr.net",
	cell: "0937402119",
	group: "Family"
}, {
	name: "babushka",
	email: "babushka41@ukr.net",
	cell: "0937402119",
	group: "Family"
}, {
	name: "Ann",
	email: "ann@ukr.net",
	cell: "0937402119",
	group: "most awesome"
}, {
	name: "Sergey",
	email: "sergey@ukr.net",
	cell: "0937402119",
	group: "Coleagues"
}]
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
$(document).on('click', '.contact-profile', function(){
	var name = $(this).find('.name').text();
	var current_contact = get_db_contact(name);
	$('.contact-name').text(current_contact.name);
	$('.num').text(current_contact.cell);
	$('.email').text(current_contact.email);
	$('#information').removeClass('hidden');
	$(this).addClass('highlight').siblings().removeClass('highlight');
});
$(document).on('click', '.btn-danger', function(){
		$('.highlight').remove();
});
$(document).on('click', '#submit_form', function(){
	var inputName = $('#inputName').val();
	var inputEmail = $('#inputEmail').val();
	var inputMobile = $('#inputMobile').val();
	var inputGroup = $('#inputGroup').val();
	CONTACT.push({
		name: inputName,
		email: inputEmail,
		cell: inputMobile,
		group: inputGroup
	});
	render_contacts_list();
	$('#myModal').modal('hide');
});
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
$(document).on('click', '#update_form', function(){
	var inputName = $('#inputName').val();
	var inputEmail = $('#inputEmail').val();
	var inputMobile = $('#inputMobile').val();
	var inputGroup = $('#inputGroup').val();
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
});
render_contacts_list();