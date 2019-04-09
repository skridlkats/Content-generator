$(document).ready(function() {

    canvaWidth = 1000;
    canvaHeight = 1000;
    var canvas = document.createElement('canvas');
    canvas.width = canvaWidth;
    canvas.height = canvaHeight;

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    pointX = 500;
    pointY = 500;
    var fontSize = 20, padding = 10;
    var eclipseColor = 'rgba(0, 0, 0, .6)', loadedCounter = 0; //заливка
    var pictures = new Array(4);
    for (var i = 0; i < 4; i++) {
        pictures[i] = new Image();
        pictures[i].src = 'https://source.unsplash.com/collection/112716'+ (3 + i) +'/'+ canvaWidth +'x'+ canvaHeight;
        // https://source.unsplash.com/collection/190727/1600x900
        }

    function getQuoteStrings(quote, ctx) {
        var quoteStrings = [];
        var arrQuote = quote.split(" ");
        var lenCounter = 0, globI = 0, strCounter = 0;
        ctx.font = "bold 30px Arial, sans-serif";
        ctx.fillStyle = "white";
        ctx.textBaseline = "center";
        for (var i = 0; i < arrQuote.length; i++) {
            if (ctx.measureText(arrQuote.slice(globI, i+1).join(" ")).width >= canvaWidth-2*padding) {
                quoteStrings.push(arrQuote.slice(globI, i).join(" "));
                globI = i;
                strCounter++;
            }
        }
        quoteStrings.push(arrQuote.slice(globI, arrQuote.length).join(" "));
        return quoteStrings
    }

    function printQuote(quote, ctx) {
        var quoteStrings = getQuoteStrings(quote, ctx);
        for (var i = 0; i < quoteStrings.length; i++) {
            ctx.fillText(quoteStrings[i],
                        (canvaWidth-2*padding-ctx.measureText(quoteStrings[i]).width)/2 + 10,
                        (canvaHeight-2*padding - fontSize*quoteStrings.length)/2 + fontSize*(i+1));
        }
    }

    pictures[0].onload = pictures[1].onload = pictures[2].onload = pictures[3].onload = function() {
        loadedCounter++;
        if (loadedCounter == 4) {
            ctx.drawImage(pictures[0], pointX - canvaWidth, pointY - canvaHeight);
            ctx.drawImage(pictures[1], pointX, pointY - canvaHeight);
            ctx.drawImage(pictures[2], pointX - canvaWidth, pointY);
            ctx.drawImage(pictures[3], pointX, pointY);
            ctx.fillStyle = eclipseColor;
            ctx.fillRect(0, 0, canvaWidth, canvaHeight);
            ctx.textBaseline = "center";
            var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru';
            $.post(url, function(data) {
                console.log(data.quoteText);
                printQuote(data.quoteText, ctx)
                var dataURL = canvas.toDataURL("image/jpeg");
                var link = document.createElement(pict);
                link.href = dataURL;
                link.download = "цитатка.jpg";
                link.innerHTML = "Скачать цитату";
                body.appendChild(link);
            });
        }
    }
});