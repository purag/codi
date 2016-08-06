var blessed = require('blessed')

var ASCII = [];
for (var i = 0; i < 255; i++)
  ASCII.push(String.fromCharCode(i));

// Initialize the screen
var screen = blessed.screen({
  smartCSR: true,
  autoPadding: true,
  dockBorders: true,
  title: 'codi',
});


// Scrollable container
var container = blessed.Box({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  scrollable: true,
});
screen.append(container);

// Main text area
var input = blessed.Textarea({
  top: 0,
  left: 0,
  width: '80%',
  height: '100%',
  border: {
    type: 'line',
    fg: 'black',
  },

  // Textarea options
  align: 'left',
  valign: 'top',
  inputOnFocus: true,
});
container.append(input);

// Exit when focus is lost
input.on('blur', function() {
  return process.exit(0);
})

// Display area
var display = blessed.List({
  top: 0,
  right: 0,
  width: '25%',
  height: '100%',
  border: {
    type: 'line',
    fg: 'black',
  },

  // List options
  keys: true,
  interactive: false,
});
container.append(display);

// Update display
input.on('keypress', function() {
  // Needed to let input update with key first
  setTimeout(function() {
    display.setItems(input.value.split('\n'));
    screen.render();
  });
});

// Focus the input
input.focus();

// Render the screen
screen.render();
