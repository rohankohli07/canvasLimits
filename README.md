# canvasLimits
Example repo to test canvas limitations

# Installation
This application was made to run on node 16, update to the latest version if you have trouble running it in lower versions
To install run:
```
npm i
```
# Run
```
npm start
```
If running successfully, you should see a message saying:

Server running at http://localhost:8000/

Then open localhost:8000 on you browser to see a table rendered in a canvas element, along with a floating div which show the time taken to repaint the canvas. 

# Bugs
There's a bug in the canvas paint algorithm that the first 25 rows are outside the bounds of the canvas, I didn't solve that bug as I'm not too familiar with drawing tables in canvas elements
