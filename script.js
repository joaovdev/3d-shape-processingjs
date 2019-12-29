// Simple way to attach js code to the canvas is by using a function
function sketchProc(processing) {
processing.size(500,500);
var backgroundColour = processing.color(255, 255, 255);
var nodeColour = processing.color(40, 168, 107);
var edgeColour = processing.color(34, 68, 204);
var nodeSize = 8;
var cX = processing.centerX;
var cY = processing.centerY;

var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x,   y,   z  ],
                 [x,   y,   z+d],
                 [x,   y+h, z  ],
                 [x,   y+h, z+d],
                 [x+w, y,   z  ],
                 [x+w, y,   z+d],
                 [x+w, y+h, z  ],
                 [x+w, y+h, z+d],
                 [x,y+(h/2),z+(d/2)]];
    var edges = [[0, 1], [1, 3], [3, 2], [2, 0],
                 [4, 5], [5, 7], [7, 6], [6, 4],
                 [0, 4], [1, 5], [2, 6], [3, 7]];
    return {"nodes": nodes, "edges": edges };
};
    
var shape1 = createCuboid(-120, -20, -20, 240, 40, 40);

var rotateY3D = function(theta, nodes) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + x * sinTheta;
    }
};

var rotateX3D = function(theta, nodes) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + y * sinTheta;
    }
};

processing.draw= function() {
     var nodes = shape1.nodes;
     var edges = shape1.edges;
     var initialNodes = shape1.nodes;
     var initialEdges = shape1.edges;
    processing.background(255,255,255);
    
    var wavyPattern = Math.sin(processing.frameCount/10);
    // processing.text(processing.frameCount,20,20);
    var sinAngle = nodes[8][1]/processing.sqrt(nodes[8][1]*nodes[8][1]+nodes[8][0]*nodes[8][0]);
    var cosAngle = nodes[8][0]/processing.sqrt(nodes[8][1]*nodes[8][1]+nodes[8][0]*nodes[8][0]);
    var anAngle = nodes[8][2]/processing.sqrt(nodes[8][1]*nodes[8][1]+nodes[8][0]*nodes[8][0]);
    // for (var q = 0; q < 4; q++){
    //     nodes[q][0] += cosAngle*wavyPattern;
    //     nodes[q][1] += sinAngle*wavyPattern;
    //     nodes[q][2] += anAngle*wavyPattern;
    // }
     var add0 = cosAngle*wavyPattern*10;
     var add1 = sinAngle*wavyPattern*10;

    processing.fill(0,0,0);
    processing.text("Mouse X = "+ processing.mouseX, 120,40);
    processing.text("Mouse Y = "+processing.mouseY, 120,50);
    // processing.text(sinAngle,120,60);
    // processing.text(cosAngle,120,70);
    // Draw edges
    processing.stroke(edgeColour);
    
    for (var e = 0; e < shape1.edges.length; e++) {
        if(e>7){
            processing.line(shape1.nodes[shape1.edges[e][0]][0]+add0, shape1.nodes[shape1.edges[e][0]][1]+add1, shape1.nodes[shape1.edges[e][1]][0], shape1.nodes[shape1.edges[e][1]][1]);
        } else if (e<4) {
            processing.line(shape1.nodes[shape1.edges[e][0]][0]+add0, shape1.nodes[shape1.edges[e][0]][1]+add1, shape1.nodes[shape1.edges[e][1]][0]+add0, shape1.nodes[shape1.edges[e][1]][1]+add1);
        } else{
            processing.line(shape1.nodes[shape1.edges[e][0]][0], shape1.nodes[shape1.edges[e][0]][1], shape1.nodes[shape1.edges[e][1]][0], shape1.nodes[shape1.edges[e][1]][1]);
        }
    }

    // Draw nodes
    processing.fill(nodeColour);
    processing.noStroke();
    for (var n = 0; n < shape1.nodes.length; n++) {
        var node = shape1.nodes[n];
        if(n < 4){
        processing.ellipse(node[0]+add0, node[1]+add1, nodeSize, nodeSize);
        }else{
        processing.ellipse(node[0], node[1], nodeSize, nodeSize);
        }
    }
    shape1.nodes = initialNodes;
    shape1.edges = initialEdges;
};

processing.mouseDragged = function() {
    var dx = processing.mouseX - processing.pmouseX;
    var dy = processing.mouseY - processing.pmouseY;
    var nodes = shape1.nodes;
    rotateY3D(dx/50, nodes);
    rotateX3D(dy/50, nodes);
};

processing.translate(200, 200);
}
var canvas = document.getElementById("canvas1");
var p = new Processing(canvas, sketchProc);
