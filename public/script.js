const socket = io();


const messageContainer = document.getElementById('message');
const sendButton = document.getElementById('send');
const connectButton = document.getElementById('submit');
const messageInput = document.getElementById('message-input');

sendButton.disabled = true;



connectButton.addEventListener('click', (e)=> {
    connectButton.disabled = true;
    sendButton.disabled = false;
    const name = prompt('What is your name') || 'Anonymous';
    appendMessage(`You connected`);
    socket.emit('new-user', name);
})
    


socket.on('message-sent', data => {
    appendMessage(`${data.user}: ${data.message}`);
    
});

socket.on('new-user-connected', userName => {
    appendMessage(`${userName} connected`);
    
});

socket.on('user-disconnect', userName => {
    appendMessage(`${userName} disconnected`);
    
});

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get the message from the input field
    const message = messageInput.value;
    
    // Emit the message to the server
    socket.emit('message-sent', message);

    appendMessage(`You: ${message}`);
    
    // Clear the input field
    messageInput.value = '';
});

function appendMessage(message) {
    // Create a new div element for the message
    const messageElement = document.createElement('div');
    messageElement.classList.add('alert', 'alert-primary', 'mt-2', 'col-lg-6'); // Add Bootstrap styling
    messageElement.innerText = message;

    // Append the message element to the container
    messageContainer.append(messageElement);
}