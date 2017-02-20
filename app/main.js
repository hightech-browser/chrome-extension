var URL_SERVER = 'https://localhost:443';
var socket = io.connect(URL_SERVER);

socket.on('open', function (data) {
  console.log(data);
  openInNewTab(data.url);
});

// socket.emit('open', { url: 'http://tecmundo.com.br' });

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}