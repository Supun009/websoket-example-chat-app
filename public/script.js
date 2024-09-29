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

    if (message == '') {
        return
    }
    
    // Emit the message to the server
    socket.emit('message-sent', message);

    appendMyMessage(message);
    
    // Clear the input field
    messageInput.value = '';
});

function appendMyMessage(message) {
    // Create a new div element for the message
    const messagecard = document.createElement('div');
    const messageElement = document.createElement('div');
    messagecard.classList.add('row', 'justify-content-end'); 
    messageElement.classList.add( 'card', 'mt-2', 'col-auto' );
    messageElement.innerText = message;
    messagecard.append(messageElement)
    messageContainer.append(messagecard);
}

function appendMessage(message) {
    const messagecard = document.createElement('div');
    const messageElement = document.createElement('div');
    messagecard.classList.add('row', 'justify-content-start'); 
    messageElement.classList.add( 'card', 'mt-2', 'col-auto' );
    messageElement.innerText = message;
    messagecard.append(messageElement)
    messageContainer.append(messagecard);
}