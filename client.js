var socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('ting.mp3');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    messageInput.value=''; 
})

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);  
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
}

var x = prompt("Enter your name to join.");
socket.emit('new-user-joined', x);
const heading = document.getElementById('Myheading');
heading.innerHTML = `Hi ${x}, here you go..`;

socket.on('user-joined', name =>{
    append(`${name} JOINED THE CHAT.`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})
