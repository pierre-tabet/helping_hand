var x_coords = [];
var y_coords = [];
const urls = ["https://bit.ly/3roE2aL","https://bit.ly/3cmv61p","https://bit.ly/39dACRM"];
var counter = 0;

window.addEventListener('load',()=>{
    var canvas = document.getElementById('canvas_window')
    window.ctx = canvas.getContext('2d');

    base_image = new Image();
    base_image.src = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
    base_image.onload = function(){
      ctx.drawImage(base_image, 0, 0);
    }
    //Resize
    canvas.width = 432;
    canvas.height = 288;

    //variables
    let painting = false;

    function startPosition(){
        painting = true;
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath()
    }
    function draw(e){
        if(!painting) return;
        var x = e.clientX;
        var y = e.clientY;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        var coor = "Coordinates: (" + x + "," + y + ")";
        x_coords.push(x);
        y_coords.push(y);
        //document.getElementById("x_coordinates").innerHTML = x_coords[x_coords.length-1];
        //document.getElementById("y_coordinates").innerHTML = y_coords[y_coords.length-1];
        //console.log(x)
    }
    //Eventlisteners
    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishedPosition)
    canvas.addEventListener('mousemove', draw)



});

$(document).ready(function(){
    $('#postdata').click(function(){
        var url = window.location.href;
        console.log(url)
        var id = url.split("?id=")[1]
        console.log(id)
        PostCoordinates(x_coords,y_coords, id, counter)
    })
    $("#next_image").click(()=>{
        if (counter === urls.length - 1){
            counter = 0;
            console.log(counter)
        }else{counter++;}
        base_image = new Image();
        base_image.src = `${urls[counter]}`
        console.log(base_image.src)
        base_image.onload = function(){
          ctx.drawImage(base_image, 0, 0);
        }
    })
});
