document.addEventListener('DOMContentLoaded', () => {
 const input = document.getElementById('todo-input');
 const addButton = document.getElementById('add-button');
 const list = document.getElementById('todo-list');

 // Corrected event listener
 addButton.addEventListener('click', () => {
 console.log('Add button clicked'); // Log: Check if the button click is detected
 const text = input.value.trim();
 console.log('Input text:', text); // Log: Check the input text
 if (text) {
 addTodoItem(text);
 input.value = '';
 } else {
 console.log('No text entered'); // Log: Check if the input is empty
 }
 });

 function addTodoItem(text) {
 console.log('Adding todo item:', text); // Log: Check if the function is called
 const listItem = document.createElement('li');
 listItem.className = 'todo-item';

 const itemSpan = document.createElement('span');
 itemSpan.textContent = text;

 // Timer input
 const timerInput = document.createElement('input');
 timerInput.type = 'number';
 timerInput.placeholder = 'Minutes';
 timerInput.className = 'timer-input';

 const timerDisplay = document.createElement('span');
 timerDisplay.className = 'timer-display';
 timerDisplay.textContent = '00:00:00';

 const editButton = document.createElement('button');
 editButton.className = 'edit-button';
 editButton.textContent = 'Edit';

 const deleteButton = document.createElement('button');
 deleteButton.className = 'delete-button';
 deleteButton.textContent = 'Delete';
 deleteButton.addEventListener('click', () => {
 listItem.remove();
 });

 editButton.addEventListener('click', () => {
 itemSpan.contentEditable = true;
 itemSpan.focus();
 editButton.textContent = 'Save';

 itemSpan.addEventListener('blur', () => {
 itemSpan.contentEditable = false;
 editButton.textContent = 'Edit';
 });

 itemSpan.addEventListener('keydown', (event) => {
 if (event.key === 'Enter') {
 itemSpan.blur();
 }
 });
 });

 // Timer functionality
 const startTimerButton = document.createElement('button');
 startTimerButton.textContent = 'Start Timer';
 startTimerButton.className = 'start-timer-button';

 startTimerButton.addEventListener('click', () => {
 const minutes = parseInt(timerInput.value);
 if (isNaN(minutes) || minutes <= 0) {
 alert('Please enter a valid time in minutes.');
 return;
 }

 startTimer(minutes, itemSpan, listItem, timerDisplay);
 });


 listItem.appendChild(itemSpan);
 listItem.appendChild(timerDisplay);
 listItem.appendChild(timerInput);
 listItem.appendChild(startTimerButton);
 listItem.appendChild(editButton);
 listItem.appendChild(deleteButton);
 list.appendChild(listItem);
 }

 function startTimer(minutes, itemSpan, listItem, timerDisplay) {
 console.log("startTimer called with minutes:", minutes)
 const timerDuration = minutes * 60;
 let timeLeft = timerDuration;

 function updateTimerDisplay() {
 console.log("updateTimerDisplay called");
 let hours = Math.floor(timeLeft / 3600);
 let minutes = Math.floor((timeLeft % 3600) / 60);
 let seconds = timeLeft % 60;

 hours = String(hours).padStart(2, '0');
 minutes = String(minutes).padStart(2, '0');
 seconds = String(seconds).padStart(2, '0');

 const formattedTime = `${hours}:${minutes}:${seconds}`;
 console.log("formattedTime:", formattedTime);
 timerDisplay.textContent = formattedTime;
 }

 updateTimerDisplay();

 const timerInterval = setInterval(() => {
 timeLeft--;
 updateTimerDisplay();

 if (timeLeft <= 0) {
 clearInterval(timerInterval);
 alert();
 listItem.classList.add('timer-expired');
 }
 }, 1000);
 }
});
