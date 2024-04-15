function saveStickyNotes() {
  const stickyNotes = document.querySelectorAll('.sticky');
  const notesData = Array.from(stickyNotes).map(note => ({
    id: note.dataset.id,
    content: Array.from(note.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE) 
      .map(node => node.textContent.trim())
      .join(' ') 
  }));

  localStorage.setItem('stickyNotes', JSON.stringify(notesData));
}


function loadStickyNotes() {
  const savedNotes = localStorage.getItem('stickyNotes');

  if (savedNotes) {
    const notesData = JSON.parse(savedNotes);

    notesData.forEach(note => createStickyNoteElement(note.id, note.content));
  }
}

function createStickyNoteElement(id, content) {
  const container = document.getElementById('stickyContainer');
  const sticky = document.createElement('div');
  sticky.className = 'sticky';
  sticky.contentEditable = true;
  sticky.textContent = content;
  sticky.dataset.id = id;

  if (!sticky.querySelector('.delete-btn')) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
      container.removeChild(sticky);
      saveStickyNotes();
    };
    sticky.appendChild(deleteBtn);
  }

  container.appendChild(sticky);
}

document.addEventListener('DOMContentLoaded', loadStickyNotes);

document.getElementById('addBtn').addEventListener('click', () => {
  const stickyText = prompt('Enter sticky note text:');
  if (stickyText) {
    const id = Date.now();
    createStickyNoteElement(id, stickyText);
    saveStickyNotes();
  }
});

function saveTaskList() {
  const tasks = document.querySelectorAll('.task span#taskname');
  const taskNames = Array.from(tasks).map(task => task.textContent);

  localStorage.setItem('taskList', JSON.stringify(taskNames));
}


function loadTaskList() {
  const savedTasks = localStorage.getItem('taskList');

  if (savedTasks) {
    const taskList = JSON.parse(savedTasks);

    taskList.forEach(taskName => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task';

      const taskNameSpan = document.createElement('span');
      taskNameSpan.id = 'taskname';
      taskNameSpan.textContent = taskName;

      let deletedTasksArray = [];

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.innerHTML = '<i class="far fa-check"></i>';
      deleteButton.onclick = function() {

        const taskName = taskNameSpan.textContent;

        alert("Deleted Task: " + taskName);
        localStorage.setItem("deletedTask", taskName);
        deletedTasksArray.push(taskName);

        localStorage.setItem("deletedTasksArray", JSON.stringify(deletedTasksArray));

        const completedTasksDiv = document.getElementById('completedTasks');
        completedTasksDiv.innerHTML += `<div>${taskName}</div>`;
        
        taskElement.remove();
        saveTaskList();
      };
      

      taskElement.appendChild(taskNameSpan);
      taskElement.appendChild(deleteButton);

      document.querySelector('#tasks').appendChild(taskElement);
    });
  }
}

document.addEventListener('DOMContentLoaded', loadTaskList);

document.querySelector('#push').onclick = function() {
  const taskInput = document.querySelector('#newtask input');
  const taskName = taskInput.value.trim();

  if (taskName.length === 0) {
    alert("Enter task name");
  } else {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskNameSpan = document.createElement('span');
    taskNameSpan.id = 'taskname';
    taskNameSpan.textContent = taskName;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '<i class="far fa-check"></i>';
    deleteButton.onclick = function() {
      taskElement.remove();
      saveTaskList();
    };

    taskElement.appendChild(taskNameSpan);
    taskElement.appendChild(deleteButton);

    document.querySelector('#tasks').appendChild(taskElement);
    saveTaskList();

    taskInput.value = '';
  }
};
