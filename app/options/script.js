var URL_SERVER = 'https://localhost:443';
var socket = io.connect(URL_SERVER);

chrome.storage.sync.get(function(data) {
  if(!data || !data.name || !data.hash){
    data = {
      'name' : generateRandomHash(),
      'hash' : generateRandomHash()
    }

    chrome.storage.sync.set(data, function() {
      console.info('Settings saved');
    });
  }

  document.getElementById("name").value = data.name;

  $('#hash-code').html('<a href="' + URL_SERVER + '/name?id=' + data.hash + '" target="_blank">' + data.hash + '</a>');

  var qrcode = new QRCode("qrcode", {
      text: data.hash,
      width: 200,
      height: 200,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  });

  socket.emit('registry', data);
});

$('#update').click(save);

window.onbeforeunload = save;

var timeout = 0;

function save() {
  clearTimeout(timeout);
  $('#message').html('saving...');
  chrome.storage.sync.get(function(data) {
    data.name = document.getElementById("name").value;
    socket.emit('change-name', data.name);
    chrome.storage.sync.set(data, function() {
      $('#message').html('Settings saved');

      timeout = setTimeout(function() {
        $('#message').html('');
      }, 2000);
    });

  });
}

function generateRandomHash(){
  return Math.random().toString(36).substring(2);
}