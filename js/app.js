(function (window) {
    'use strict';

    var newTodoEl = document.getElementById('new-todo');
    var newTodoContainer = document.getElementById('todo-list');
    var toggleAll = document.querySelector('.toggle-all');
    var clearCompleted = document.querySelector('.clear-completed');

    newTodoEl.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        var newTodoElVal = newTodoEl.value.trim();
        if (key === 13 && newTodoElVal) {
            newTodoEl.value = '';
            newTodoContainer.appendChild(addElement(newTodoElVal));
            countLeft();
        }
    });


    toggleAll.addEventListener('click', function (e){
        var items;
        var index = 0;
        var itemsLength;
        if (this.checked) {
            items = newTodoContainer.querySelectorAll('li:not(.completed)');
        } else {
            items = newTodoContainer.querySelectorAll('li.completed');
        }

        itemsLength = items.length;

        for (index; index < itemsLength ; index++) {
            items[index].classList.toggle('completed', this.checked);
            items[index].querySelector('input[type="checkbox"]').checked = this.checked;
        }
    });

    clearCompleted.addEventListener('click', function (e) {
        var items = newTodoContainer.querySelectorAll('li.completed');
        var index = 0;
        var itemsLength = items.length;

        for (index; index < itemsLength ; index++) {
            newTodoContainer.removeChild(items[index]);
        }

        countLeft();

    });
})(window);

function addElement(itemName) {
    var newLi = document.createElement('li');
    var newDiv = document.createElement('div');
    var newInputCheckbox = document.createElement('input');
    var newInputEdit = document.createElement('input');
    var newLabel = document.createElement('label');
    var newButton = document.createElement('button');
    var newTodoContainer = document.getElementById('todo-list');
    var newInputCheckboxListener = function (e) {
        newLi.classList.toggle('completed',this.checked);
        countLeft();
    };

    newDiv.classList.add('view');
    newInputCheckbox.classList.add('toggle');
    newInputCheckbox.type = 'checkbox';
    newButton.classList.add('destroy');
    newInputEdit.classList.add('edit');
    newLabel.innerHTML = itemName;

    newDiv.appendChild(newInputCheckbox);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newButton);
    newLi.appendChild(newDiv);
    newLi.appendChild(newInputEdit);

    newInputCheckbox.addEventListener('click', newInputCheckboxListener);

    newButton.addEventListener('click', function _func(e){
        newInputCheckbox.removeEventListener('click', newInputCheckboxListener);
        newButton.removeEventListener('click', _func);
        newTodoContainer.removeChild(newLi);
        countLeft();
    });

    return newLi;
}

function countLeft() {
    var newTodoContainer = document.getElementById('todo-list');
    var totalNumber = newTodoContainer.childElementCount;
    var completedNumber = newTodoContainer.querySelectorAll('li.completed');

    document.querySelector('span > strong').innerHTML = totalNumber - (completedNumber ? completedNumber.length : 0);
}