var globalVariables = {
  mail : [],
  contacts : []
}

window.onload = function setup() {
  globalVariables.mail = getMail();
  searchMail('');
  globalVariables.contacts = getContacts();
  searchContacts('');
}

function getMail() {
  return [mail('max@gmail.com','max has answered your question on kijiji.'), mail('spam@gmail.com','Make 100 000$ a day with this simple trick'), mail('uqo@gmail.com','Make 100 000$ a day with this simple trick')];
}

function getContacts() {
  return ['max@gmail.com', 'spam@gmail.com', 'uqo@gmail.com'];
}

function sendMail() {
  var contact = document.getElementById('sendContact').value;
  var content = document.getElementById('sendContent').value;
  document.getElementById('sendContact').value = '';
  document.getElementById('sendContent').value = '';
}



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "300px";
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.margin = "3% 10%";
  } 

function route(target) {
    var elementIDs = ["inbox", "send","contacts"]
    elementIDs.forEach(element => {
        document.getElementById(element).style.display = "none";
    })
    document.getElementById(target).style.display = "block";
  } 

function searchMail(value) {
    var displayedMail = [];
    var result = "<caption>Courrier</caption><tr><th>Sent by</th><th>Content</th></tr>";
    globalVariables.mail.forEach(element => {
      if (element.sender.toLowerCase().includes(value.toLowerCase()) || element.content.toLowerCase().includes(value.toLowerCase())) {
        displayedMail.push(element);
      }
    })
  
    displayedMail.forEach( element => {
      result += ('<tr><td>' + element.sender + '</td><td>' + element.content + '</td></tr>');
    })

    if(!displayedMail) {
      result += "<tr text-alight: 'center'>no results...</tr>";
    }

    document.getElementById('displayedMail').innerHTML = result;
  }

function searchContacts(value) {
    var displayedContacts = [];
    var result = "<caption>Contacts</caption>";
    globalVariables.contacts.forEach(element => {
      if (element.toLowerCase().includes(value.toLowerCase())) {
        displayedContacts.push(element);
      }
    })
  
    displayedContacts.forEach( element => {
      result += ('<tr><td>' + element + '</td></tr>');
    })

    if(!displayedContacts) {
      result += "<tr text-alight: 'center'>no results...</tr>";
    }

    document.getElementById('displayedContacts').innerHTML = result;
  }
  
function mail(sender, content) {
    return ({sender: sender, content: content});
  }