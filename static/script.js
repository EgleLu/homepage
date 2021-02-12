$(function(){   
    // document ready 
    console.log("I have my jquery")
    var socket = io();
    socket.on('connect', function() {
        if (!localStorage.getItem('username')) {
            $("#myModal").modal({backdrop: 'static' , keyboard: false});
            $('.modal-title').text("Please enter your username");
            $('#modalInput').val("");
        }
        
    });

    $("#modalInput").on('keyup', function (key) {
        if ($(this).val().length > 0 ){
            $("#modalButton").attr('disabled',false);
            if (key.keyCode==13 ) {
                $('#modalButton').click();
            }
        }
        else {
            $("#modalButton").attr('disabled',true);
        }
    });

    $("#modalButton").on('click', function () {
        // action for new username
        if (!localStorage.getItem('username')) {    
            var username=$('#modalInput').val();
            localStorage.setItem('username',username);
            // socket.emit('new username',{'username':username});
        } 

    });
let myUser;
myUser = localStorage.username;

    socket.on('add username', data=> {

        localStorage.setItem('username',data["username"]);
        myUser = localStorage.username;
        $('#username').text(localStorage.getItem('username'));
    });

    $('#send-message').on('click', function(){
        var time = new Date().toLocaleString();
       socket.send({'msg': $('#message').val(), 'username': localStorage.username, 'time': time});
        $('#message').val("");
    })

    socket.on('message', data => {
        const p = document.createElement('p');
        p.innerHTML = data.msg;
        const name = document.createElement('span');
        name.innerHTML = data.username;
        const time = document.createElement('span');
        time.innerHTML = data.time;

        $('#display-message-area').append(p);
        $('#display-message-area').append(name);
        $('#display-message-area').append(time);



        $('#display-message-area').scrollTop(5000)
    })





});
