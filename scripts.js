$(document).ready(function() {

    canvaWidth = 1000;
    canvaHeight = 1000;
    var canvas = document.createElement('canvas');
    canvas.width = canvaWidth;
    canvas.height = canvaHeight;

    var ctx = canvas.getContext('2d');
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    pointX = Math.round(Math.random()*canvaWidth/2 + canvaWidth/2);
    pointY = Math.round(Math.random()*canvaHeight/2 + canvaHeight/2);
    var fontSize = 20, padding = 0;
    var eclipseColor = 'rgba(0, 0, 0, .6)', loadedCounter = 0;
    var pictures = new Array(4);
    for (var i = 0; i < 4; i++) {
        pictures[i] = new Image();
        pictures[i].src = 'https://source.unsplash.com/collection/112716'+ (3 + i) +'/'+ canvaWidth +'x'+ canvaHeight;
        // https://source.unsplash.com/collection/190727/1600x900
        }


    pictures[0].onload = pictures[1].onload = pictures[2].onload = pictures[3].onload = function() {
        loadedCounter++;
        if (loadedCounter == 4) {
            ctx.drawImage(pictures[0], pointX - canvaWidth, pointY - canvaHeight);
            ctx.drawImage(pictures[1], pointX, pointY - canvaHeight);
            ctx.drawImage(pictures[2], pointX - canvaWidth, pointY);
            ctx.drawImage(pictures[3], pointX, pointY);
            });
        }
    }
});