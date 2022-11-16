var data = [[]];
var clientID = 0;
var connection = new WebSocket("ws://localhost:8000", "json");

var renderCount = document.getElementById("render-count");
var canvas = document.getElementById("canvas");

var context = canvas.getContext("2d");

var cellWidth = 60;
var cellHeight = 20;

function setUsername() {
  console.log("***SETUSERNAME");
  var msg = {
    name: 'Rohan Kohli',
    date: Date.now(),
    id: clientID,
    type: "username"
  };
  connection.send(JSON.stringify(msg));
}

var logged = false;


function renderData(newData) {
  const startTime = new Date().getTime();
  data = newData;
  let bh = data.length * cellHeight;
  let bw = (Object.keys(data[0]).length) * cellWidth;
  var p = 2;

  height = canvas.height;
  width = canvas.width;

  context.clearRect(0, 0, width, height);
  for (var x = 0; x <= bw; x += cellWidth) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += cellHeight) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "black";
  context.stroke();

  let keys = Object.keys(data[0]);

  for (let y = 1, count = 0; y <= bh; y += cellHeight) {
    for (let x = 0, keyCount = 0; x < bw; x += cellWidth) {
      context.fillStyle = "black";
      context.font = "normal normal 12px Verdana";
      context.fillText((data[count])[keys[keyCount]], 0.5 + x + p + 5, y);
      ++keyCount;
    }
    ++count;
  }

  context.clearRect(12, bh + 2, width, height)
  context.clearRect(bw + 2, 9.5, width, height)
  context.save();
  renderCount.innerText = `Time Taken: ${(new Date().getTime() - startTime) / 1000}`;
};

connection.onopen = function (evt) {
  console.log("***ONOPEN");
};

connection.onmessage = function (evt) {
  var msg = JSON.parse(evt.data);
  console.log("***ONMESSAGE", { msg });

  switch (msg.type) {
    case "id":
      clientID = msg.id;
      setUsername();
      break;
    case "celldata":
      renderData(msg.data);
    default:
      break;
  }
}
