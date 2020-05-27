import React, {useState} from 'react';
import './App.css';
import * as joint from "rappid"

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 1000,
    gridSize: 10,
    drawGrid: true,
    background: {
        color: 'rgb(0, 255, 0)'
    }
});

var commandManager = new joint.dia.CommandManager({ graph: graph });


var HTML = new joint.shapes.standard.Rectangle();
HTML.position(400, 10);
HTML.resize(100, 100);
HTML.attr({
    body: {
        fill: "lightblue ",
        rx: 50
    },
    label: {
        text: 'Learn HTML',
        fill: 'Black'
    }
});
HTML.addTo(graph);

var CSS = new joint.shapes.standard.Rectangle();
CSS.position(400, 330);
CSS.resize(100, 70);
CSS.attr({
    body: {
        fill: "transparent",
        rx: 50
    },
    label: {
        text: 'Learn CSS',
        fill: 'Black'
    }
});
CSS.addTo(graph);

var linkHTMLtoCSS = new joint.shapes.standard.Link();
linkHTMLtoCSS.source(HTML);
linkHTMLtoCSS.target(CSS);
linkHTMLtoCSS.vertices([
    { x: 250, y: 100 },
    { x: 350, y: 200 },
    { x: 250, y: 300 }
]);
linkHTMLtoCSS.appendLabel({
    attrs: {
        text: {
            text: 'LabelOnLine'
        }
    }
});
linkHTMLtoCSS.connector('rounded');
linkHTMLtoCSS.attr({
    line:{
        sourceMarker: {
            'type': 'path',
            'stroke': 'red',
            'stroke-width': 2,
            'fill': 'blue'
        },
        targetMarker: {
            'type': 'path',
            'stroke': 'blue',
            'stroke-width': 2,
            'fill': 'red'
        },
        stroke: "blue",
        strokeWidth: 2,
        strokeDasharray: '15 2',
    }
});
linkHTMLtoCSS.addTo(graph);

var link3 = new joint.shapes.standard.Link();
link3.source(HTML);
link3.target(CSS);
link3.vertices([
    { x: 250, y: 200 }
]);
link3.connector('jumpover', { size: 5 });
link3.addTo(graph);

function App() {



    let [procent, setProcent] = useState(100)

    let input = React.createRef();

    paper.scale(procent/100);

  return (<>
      <button onClick={() => {commandManager.undo();}}>UNDO</button>
      <button onClick={() => {commandManager.redo();}}>REDO</button>
      10%<input ref={input} type="range" min="10" max="300" step="10" onInput={() => {setProcent(input.current.value)}}/>300%
      current{procent}
  </>);
}

export default App;
