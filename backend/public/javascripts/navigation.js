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
		console.log(key);
		encrypt.setPublicKey(key);
		console.log(document.getElementById("compose-textarea").value)
		var encrypted=encrypt.encrypt(document.getElementById("compose-textarea").value)
		console.log(encrypted);
		var prikey="-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgFj0MczehphhTLLrEJUMGwCY1AlBKHPP2iVoMW3xvt2ULDFwJa8G\nl7oT4Vsp7wPIAOb9D7yKUXpd/sYaFsDcywzQdo532NGzkXWkw8MI5pCySDOW1ETL\n9zauGj8k5wVrEjnRakk5kI1pO0CmHC1oB1ln6KhZ84szqLbAaxC224VDAgMBAAEC\ngYAbUpZhWRB6iZhndHBZd6hrnIW0egEU4Ykd6E0WeiSoJrUUUmAgzKOaEjUsLUsv\nHCW6zYwh21J/hZOWAblvb+ImJfpHjOygZth0zRcu5eid4Sv8s0s8oYtscCU1hDj4\nNZPoSyZF1G/MaP2U+dW1A6G5WTB5wZGsWEUjCFjjV5dT0QJBAKwA3uSaxDcb1lx+\nS1vUrI4/Ve8qV5/CRPJ6Cv2KApQTptyffKpUe1hWDnpTyyXkWhlvXuJkDPINxl93\nfgJ51+0CQQCEZNQiigJaPSll+rCPPb5FbpsthvrsQ2q0qUNE6Yg829t7gzAgkrc6\njrFtmVgkzReIvzHjdi/RAzRfRhZMKsvvAkEAnAXOKiAZjMO7lvsY8JviSsY49VG7\nWjemwyzhe0sNO7T3z3j8ZKVtnZuyVlRcGmshL6FOuJ15ALhuEXsa2rQboQJAc89/\ngXcX97forrxMFgD8n9/Q/lJEzMdsX/xwS6e89P+dTr3DK7srbJ3FtwmcgRSmsYgO\nK9sGmN8kwPKeLqKBIQJAAKp7zKKVUqhrzXCuWL9EYtnCrlLnfeZU2dLXEn7X8gXP\nZXnNdhk2yRjKWLYCqpQOywPD8aMldXU6MWeB73kBAQ==\n-----END RSA PRIVATE KEY-----";
		console.log(prikey);
		var decrypt=new JSEncrypt();
		decrypt.setPrivateKey(prikey);
		var decrypted=decrypt.decrypt(encrypted);
		console.log(decrypted);
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
		var key=$("#privkey").val();
		var decrypt=new JSEncrypt();
		decrypt.setPrivateKey(key);
		var text=$("#ReadContent").text();
		var decrypted=decrypt.decrypt(text);
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