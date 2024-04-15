let timer;
let timeLeft;
let paused = false;
let completedTasks = [];

function startTimer() {
  const taskName = document.getElementById('taskName').value;
  const hoursInput = parseInt(document.getElementById('hoursInput').value);
  const minutesInput = parseInt(document.getElementById('minutesInput').value);

  if (!taskName || isNaN(hoursInput) || isNaN(minutesInput)) {
    alert("Please enter a valid task name, hours, and minutes.");
    return;
  }

  timeLeft = (hoursInput * 3600) + (minutesInput * 60);
  document.getElementById('taskName').disabled = true;
  document.getElementById('hoursInput').disabled = true;
  document.getElementById('minutesInput').disabled = true;

  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  document.getElementById('timerDisplay').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (timeLeft === 0) {
    clearInterval(timer);
    document.getElementById('taskName').disabled = false;
    document.getElementById('hoursInput').disabled = false;
    document.getElementById('minutesInput').disabled = false;
    completedTasks.push(document.getElementById('taskName').value);
    alert("Time's up!");
  } else {
    timeLeft--;
  }
}

function stopTimer() {
  clearInterval(timer);
  paused = true;
}

function resumeTimer() {
  if (paused) {
    timer = setInterval(updateTimer, 1000);
    paused = false;
  }
}

function checkProgress() {
  document.getElementById('progressScreen').classList.remove('hidden');
  document.querySelector('.container').classList.add('hidden');

  const ul = document.getElementById('completedTasks');
  ul.innerHTML = "";
  completedTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    ul.appendChild(li);
  });
}

function goBack() {
  document.getElementById('progressScreen').classList.add('hidden');
  document.querySelector('.container').classList.remove('hidden');
}
