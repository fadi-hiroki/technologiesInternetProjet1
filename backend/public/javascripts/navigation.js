//Jean-Marc Hebert et Mohamed LADJADJAT
$(document).ready(function(){
	var encrypt=new JSEncrypt();
	$(".MailboxLink").click(function() {
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
		var key=document.getElementById("toCompose").value;
		var encrypt=new JSEncrypt();
		encrypt.setPublicKey(key);
		var encrypted=encrypt.encrypt(document.getElementById("compose-textarea").value)
		var params={dest:key,msg:encrypted};
		$.post("/addLetters", params, function(data, status){
			resetCompose();
			$("#Compose").css("display", "none");
			$("#content-header").html("<h1>Mailbox</h1>");
			$("#Mailbox").css("display", "inline");
		})
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
	$("#getLetters").click(function(){
		refreshMessages();
	})
	$("#Decrypt").click(function(){
		var key=document.getElementById("privkey").value;
		var Decrypt=new JSEncrypt();
		Decrypt.setPrivateKey(key);
		var decrypted=encrypt.encrypt(document.getElementById("ReadContent").value)
		$("#ReadContent").text(decrypted);
		$("#privkey").text('');
	})
})
var lastMessage=0;

function refreshContacts(){
	const Http = new XMLHttpRequest();
	const url='/getPeers';
	Http.open("GET", url);
	Http.responseType='json';
	Http.send();
	Http.onreadystatechange=(e)=>{
		if(Http.response!==null){
			contacts=readContacts(Http.response);
			$("#ContactsList").html("");
			for(var i=0;i<contacts.length;i++){
				$("#ContactsList").append("<tr><td>"+contacts[i].key+"</td><td>"+contacts[i].name+"</td></tr>");
			}
		}
	}
}

function refreshMessages(){
	var params={pem:document.getElementById("pubkey").value};
	$.get("/getLetters", params, function(data, status){
		messages=data;
		$("#MessagesList").html("");
		for(var i=0;i<messages.length;i++){
			$("#MessagesList").append("<tr onclick=\"readMessage("+i+")\"><td>"+messages[i].dest+"</td><td>"+messages[i].msg+"</td></tr>");
		}
	})
}

function mail(sender, content) {
    return ({dest: sender, msg: content});
  }
  
function contact(key, name){
	return ({key: key, name: name});
}

function readMessages(json){
	var messages=[];
	for(var i=0;i<json.length;i++){
		messages[messages.length]=mail(json[i].dest, json[i].msg);
	}
	return messages;
}

function readContacts(json){
	var contacts=[];
	for(var i=0;i<json.length;i++){
		contacts[contacts.length]=contact(json[i].publicKey, json[i].name);
	}
	return contacts;
}

function readMessage(i){
	var index=parseInt(i);
	refreshRead(index);
	$("#Mailbox").css("display", "none");
	$("#Read").css("display", "inline");
}

function refreshRead(i){
	$("#toRead").text(messages[i].dest);
	$("#ReadContent").text(messages[i].msg)
	lastMessage=i;
}

function resetCompose(){
	document.getElementById("toCompose").value="";
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