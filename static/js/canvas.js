var x_coords = [];
var y_coords = [];
const urls = ["static/images/Skyscraper_task.png","static/images/Skyscraper_task_2.png","static/images/Mouse_task.png","static/images/Connect_the_dots.png"];
const numb_of_let_ex = 26
const letters_array = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var counter = 0;

var log_start;
var record;
var initial_time;
var number_of_strokes = 0;
var point_time_log = [];
var total_time_log = [];




window.addEventListener('load',()=>{
    var canvas = document.getElementById('canvas_window')
    window.ctx = canvas.getContext('2d');
    ctx.canvas.style.touchAction = "none";
    base_image = new Image();
    base_image.src = 'static/images/Skyscraper_task.png';

    //update the letter exc
    document.getElementById("letter").innerHTML = letters_array[counter];

    //Resize
    canvas.width = 853;
    canvas.height = 535;

    //variables
    let painting = false;
    var entering = 0;

    base_image.onload = function(){
      ctx.clearRect(0, 0, 853,535);
      //ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height)
    }
    function startPosition(){
        painting = true;
        initial_time = new Date();
        total_time_log.push(initial_time);
        number_of_strokes++;
    }
    function finishedPosition(){
        painting = false;
        ctx.beginPath();
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
        //Time
        log_start = new Date();
        total_time_log.push(log_start);
        x_coords.push(x);
        y_coords.push(y);
        point_time_log.push(total_time_log[total_time_log.length - 1] - total_time_log[total_time_log.length - 2]);
        console.log(point_time_log + " ms");
    }


    canvas.addEventListener('pointerdown', startPosition);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', finishedPosition);





});

function PostCoordinates(xcoordinates, ycoordinates,id,counter){
            var coordinates = {xcoordinates,ycoordinates,id,counter,point_time_log, number_of_strokes}
            console.log(xcoordinates,ycoordinates,id,counter,point_time_log, number_of_strokes);
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
        console.log(url);
        var id = url.split("?id=")[1]
        console.log(id);
        PostCoordinates(x_coords,y_coords, id, counter, point_time_log, number_of_strokes);
        x_coords = [];
        y_coords = [];
        point_time_log = [];
        number_of_strokes = 0;

    })




    $("#next_image").click(()=>{
        if (counter < numb_of_let_ex-1){
            counter++;
            console.log(counter);
            ctx.clearRect(0, 0, 853,535);
        }else{
            counter++;
            base_image = new Image();
            base_image.src = `${urls[counter - numb_of_let_ex]}`
            console.log(base_image.src)
            base_image.onload = function(){
            //ctx.drawImage(base_image, 0, 0);
            ctx.clearRect(0, 0, 853,535);
            ctx.drawImage(base_image, 0, 0, 853,535);
            }
        }
    //update the letter exc
    document.getElementById("letter").innerHTML = letters_array[counter];
    })


});
