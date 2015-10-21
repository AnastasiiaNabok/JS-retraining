var ToDo = function (query) {
    'use strict';

    var rootEl = $(query);
    var newTodoEl = rootEl.find('.new-todo');
    var newTodoContainer = rootEl.find('.todo-list');
    var toggleAll = rootEl.find('.toggle-all');
    var clearCompleted = rootEl.find('.clear-completed');
    var ENTER_KEY_CODE = 13;

    newTodoEl.on('keydown', _newTodoElKeyDown);
    
    function _newTodoElKeyDown (e){
        var key = e.which || e.keyCode;
        var newTodoElVal = $.trim(newTodoEl.val());
        if (key === ENTER_KEY_CODE && newTodoElVal) {
                newTodoEl.val('');
                newTodoContainer.append(addElement(newTodoElVal));
                countLeft();
            }
        };


    toggleAll.on('click', function () {
        var index = 0;
        var items, itemsLength;
        if (this.checked) {
            items = newTodoContainer.find('li:not(.completed)');
        } else {
            items = newTodoContainer.find('li.completed');
        }

        itemsLength = items.length;
        for (index; index < itemsLength; index++) {
            $(items[index]).toggleClass('completed');
            $(items[index]).find('input[type="checkbox"]').checked = this.checked;
        }
    });

    clearCompleted.on('click', function () {
        newTodoContainer.find('li.completed').remove();
        countLeft();
    });

    function addElement(itemName) {
        var newLi = $('<li/>');
        var newDiv = $('<div/>', {class: "view"});
        var newInputCheckbox = $('<input/>', {type: "checkbox", class: "toggle"});
        var newInputEdit = $('<input/>', {class: "edit"});
        var newLabel = $('<label/>');
        var newButton = $('<button/>', {class: "destroy"});
        var newInputCheckboxListener = function () {
            newLi.toggleClass('completed');
            countLeft();
        };
        var editingListener = function () {
            var newInputEditVal = $.trim(newInputEdit.val());
            if (newInputEditVal) {
                newLabel.html(newInputEditVal);
            } else {
                newInputEdit.val(newLabel.html());
            }
            newLi.removeClass('editing');

        };


        newLabel.html(itemName);
        newInputEdit.val(itemName);

        newDiv.append(newInputCheckbox);
        newDiv.append(newLabel);
        newDiv.append(newButton);
        newLi.append(newDiv);
        newLi.append(newInputEdit);

        newInputCheckbox.on('click', newInputCheckboxListener);

        newButton.on('click', function _func() {
            console.log(newLi);
            newInputCheckbox.off('click', newInputCheckboxListener);
            newButton.off('click', _func);
            newLi.remove();
            countLeft();
        });


        newLabel.on('dblclick', function () {
            newLi.addClass('editing');
            newInputEdit.focus();
        });

        newInputEdit.on('blur', editingListener);

        newInputEdit.on('keydown', function () {
            if (e.keyCode === ENTER_KEY_CODE) {
                editingListener();
            }
        });


        return newLi;
    }


    function countLeft() {
        var newTodoContainer = rootEl.find('.todo-list');
        var totalNumber = newTodoContainer.children().length;
        var completedNumber = newTodoContainer.find('li.completed');

        rootEl.find('span > strong').html(totalNumber - (completedNumber ? completedNumber.length : 0));
    }
};

(function () {

    var curentIDNumber = 0, currentID;

    $('#create-new-todo').click(function() {

        currentID = 'todo-list-' + curentIDNumber ;

        $( ".todoapp" ).append( '<div id="' + currentID + '" class="todo-lists">' +
            '<header class="header">' +
                '<input class="new-todo" placeholder="What needs to be done?" autofocus>' +
            '</header>' +
            '<section class="main">' +
                '<input class="toggle-all" type="checkbox">' +
                '<label for="toggle-all">Mark all as complete</label>' +
                '<ul  class="todo-list">' +
                '</ul>' +
            '</section>' +
            '<footer class="footer">' +
                '<span class="todo-count"><strong>0</strong> item left</span>' +
                '<button class="clear-completed">Clear completed</button>' +
            '</footer>' +
        '</div>');
        curentIDNumber++;
        var query = '#' + currentID;
        ToDo (query);
    });
})();
