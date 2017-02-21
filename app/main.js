var URL_SERVER = 'https://localhost:443';
var socket = io.connect(URL_SERVER);

socket.on('open', function (data) {
  console.log(data);
  openInNewTab(data.url);
});

socket.on('error', function (msg) {
  console.error(msg);
});

socket.on('registry', function () {
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

    socket.emit('registry', data);
  });
});

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

function generateRandomHash(){
  return Math.random().toString(36).substring(2);
}