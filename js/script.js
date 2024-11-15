var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var menuItems = ['presentation', 'code'];
var diagnostic = document.querySelector('.output');
var hints = document.querySelector('.hints');
var startButton = document.getElementById('start-button');

var menuHTML = '';
menuItems.forEach(function(item) {
  menuHTML += '<span>' + item + ',</span> ';
});
hints.innerHTML = 'Say a menu item to navigate: ' + menuHTML;

// Start recording when Start button is clicked
startButton.onclick = function() {
  recognition.start();
  console.log('Recording started. Ready to receive a command.');
  diagnostic.textContent = 'Recording started. Please speak your command.';
};

recognition.onresult = function(event) {
  var command = event.results[0][0].transcript.toLowerCase();
  console.log('Command received: ' + command);

  if (menuItems.includes(command)) {
    window.location.href = command + ".html";
    diagnostic.textContent = 'Navigating to ' + command + '.';
  } else {
    diagnostic.textContent = "Command not recognized.";
  }
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function() {
  diagnostic.textContent = "I didn't recognize that command.";
};

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
};
