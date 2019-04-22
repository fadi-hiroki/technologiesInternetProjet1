//Jean-Marc Hebert et Mohamed LADJADJAT
$(document).ready(function(){
	refreshMessages();
	$(".MailboxLink").click(function() {
		refreshMessages();
		$("#Read").css("display", "none");
		$("#Compose").css("display", "none");
		$("#Contacts").css("display", "none");
		$("#AddContact").css("display", "none");
		$("#Mailbox").css("display", "inline");
		$("#content-header").html("<h1>Mailbox</h1>");
	})
	$(".ReadLink").click(function() {
		var id=parseInt(this.id.replace("message",""));
		refreshRead(id);
		$("#Mailbox").css("display", "none");
		$("#Compose").css("display", "none");
		$("#Contacts").css("display", "none");
		$("#AddContact").css("display", "none");
		$("#Read").css("display", "inline");
		$("#content-header").html("<h1>Lire</h1>");
	})
	$(".ComposeLink").click(function() {
		$("#Mailbox").css("display", "none");
		$("#Read").css("display", "none");
		$("#Contacts").css("display", "none");
		$("#AddContact").css("display", "none");
		$("#Compose").css("display", "inline");
		$("#content-header").html("<h1>Composer</h1>");
	})
	$(".ContactsLink").click(function() {
		refreshContacts();
		$("#Mailbox").css("display", "none");
		$("#Read").css("display", "none");
		$("#Compose").css("display", "none");
		$("#AddContact").css("display", "none");
		$("#Contacts").css("display", "inline");
		$("#content-header").html("<h1>Contacts</h1>");
	})
	$(".addContactLink").click(function() {
		refreshContacts();
		$("#Mailbox").css("display", "none");
		$("#Read").css("display", "none");
		$("#Compose").css("display", "none");
		$("#Contacts").css("display", "none");
		$("#AddContact").css("display", "inline");
		$("#content-header").html("<h1>Ajouter Contact</h1>");
	})
	$("#sendMessageButton").click(function(){
		var date=Date().toString().split(" ");
		messages[messages.length]={"cle":document.getElementById("toCompose").value,"sujet":document.getElementById("subjectCompose").value,"contenu":document.getElementById("compose-textarea").value,"date":date[1]+" "+date[2]+" "+date[3]}
		refreshMessages();
		resetCompose();
		$("#Compose").css("display", "none");
		$("#content-header").html("<h1>Mailbox</h1>");
		$("#Mailbox").css("display", "inline");
	})
	$("#addContactButton").click(function(){
		contacts[contacts.length]={"cle":document.getElementById("cleContact").value,"nom":document.getElementById("nomContact").value,"prenom":document.getElementById("prenomContact").value}
		refreshContacts();
		resetContacts();
		$("#AddContact").css("display", "none");
		$("#content-header").html("<h1>Contacts</h1>");
		$("#Contacts").css("display", "inline");
	})
	$("#resetButton").click(function(){
		resetCompose();
	})
	$("#resetContacts").click(function(){
		resetContacts();
	})
	$("#deleteEmail").click(function(){
		messages.splice(lastMessage,1);
		refreshMessages();
		$("#Read").css("display", "none");
		$("#Mailbox").css("display", "inline");
	})
})
var lastMessage=0;
function refreshContacts(){
	$("#ContactsList").html("");
	for(var i=0;i<contacts.length;i++){
		$("#ContactsList").append("<tr><td>"+contacts[i].cle+"</td><td>"+contacts[i].nom+"</td><td>"+contacts[i].prenom+"</td></tr>");
	}
}

function refreshMessages(){
	$("#MessagesList").html("");
	for(var i=0;i<messages.length;i++){
		$("#MessagesList").append("<tr onclick=\"readMessage("+i+")\"><td>"+messages[i].cle+"</td><td>"+messages[i].sujet+"</td><td>"+messages[i].date+"</td></tr>");
	}
}

function mail(sender, content) {
    return ({sender: sender, content: content});
  }
  
function contact(key, name){
	return ({key: key, name: name});
}

function readMessage(i){
	var index=parseInt(i);
	refreshRead(index);
	$("#Mailbox").css("display", "none");
	$("#Read").css("display", "inline");
}

function refreshRead(i){
	console.log(i+1);
	$("#subjectRead").text(messages[i].sujet);
	$("#toRead").text(messages[i].cle);
	$("#readTime").text(messages[i].date);
	$("#ReadContent").text(messages[i].contenu)
	lastMessage=i;
}

function resetCompose(){
	document.getElementById("toCompose").value="";
	document.getElementById("subjectCompose").value="";
	document.getElementById("compose-textarea").value="";
}

function resetContacts(){
	document.getElementById("cleContact").value="";
	document.getElementById("nomContact").value="";
	document.getElementById("prenomContact").value="";
}
function myFunction() {
  var input, filter, table, tr, td, i, txtValue, let;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("ContactsList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}