var x_coords = [];
var y_coords = [];
const urls = ["static/images/A4_Task_1.png","static/images/A4_Task_2.png","static/images/A4_Task_3.png","static/images/A4_Task_4.png"];
var counter = 0;

window.addEventListener('load',()=>{
    var canvas = document.getElementById('canvas_window')
    window.ctx = canvas.getContext('2d');
    ctx.canvas.style.touchAction = "none";
    base_image = new Image();
    base_image.src = 'static/images/A4_Task_1.png';
    base_image.onload = function(){
      //ctx.drawImage(base_image, 0, 0);
      ctx.drawImage(base_image, 0, 0, 432, 288 * base_image.height / base_image.width)
    }
    //Resize
    canvas.width = 432;
    canvas.height = 288;


    //variables
    let painting = false;
    var entering = 0;

    function startPosition(){
        painting = true;
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath()
    }
    function draw(e){
        var bx = e.target.getBoundingClientRect(),
        x = e.clientX - bx.left;
        y = e.clientY - bx.top;
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
        var coor = "Coordinates: (" + x + "," + y + ")";
        x_coords.push(x);
        y_coords.push(y);


    }
    //Eventlisteners
    //canvas.addEventListener('pointerrawupdate', startPosition)
    //canvas.addEventListener('pointerrawupdate', finishedPosition)
    //canvas.addEventListener('pointermove', draw)


    canvas.addEventListener('pointerdown', startPosition);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', finishedPosition);
    canvas.addEventListener('pointerleave', finishedPosition);






});

function PostCoordinates(xcoordinates, ycoordinates,id,counter){
            var coordinates = {xcoordinates,ycoordinates,id,counter}
            console.log(xcoordinates,ycoordinates,id,counter);
            $.ajax({
                url: '/index',
                type: 'POST',
                data: coordinates,
                success: function (response) {
                    debugger;
                    alert(response);
                }
            })
        }

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
          //ctx.drawImage(base_image, 0, 0);
          ctx.drawImage(base_image, 0, 0, 432, 288 * base_image.height / base_image.width)
        }
    })


});
