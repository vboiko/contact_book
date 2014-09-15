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
  var li_html = "";
  while(li < CONTACT.length) {
    li_html += '<div class="contact-profile col-xs-12"><img class="contact-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_8zSOldlUoIBJOkl34ZcWHcCb-n7AvrIitR7eSyKEzZxwI8OdBC09wg" alt="icon"><div class="name">' + CONTACT[li].name + '</div></div>';
    li++;
  }
  $('.contacts').append(li_html);
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
render_contacts_list();