var ToDo = (function (curentID) {
    'use strict';

    var RootEle = $('#' + curentID);
    var newTodoEl = RootEle.find('.new-todo');
    var newTodoContainer = RootEle.find('.todo-list');
    var toggleAll = RootEle.find('.toggle-all');
    var clearCompleted = RootEle.find('.clear-completed');

    newTodoEl.on('keydown', function (e) {
        var key = e.which || e.keyCode;
        var newTodoElVal = $.trim(newTodoEl.val());
        var ENTER_KEY_CODE = 13;
        if (key === ENTER_KEY_CODE && newTodoElVal) {
            newTodoEl.val('');
            newTodoContainer.append(addElement(newTodoElVal));
            routing();
            countLeft();
        }
    });


    toggleAll.on('click', function (){
        var index = 0;
        var items,itemsLength;
        if (this.checked) {
            items = newTodoContainer.find('li:not(.completed)');
        } else {
            items = newTodoContainer.find('li.completed');
        }

        itemsLength = items.length;

        for (index; index < itemsLength ; index++) {
            $(items[index]).toggleClass('completed');
            $(items[index]).find('input[type="checkbox"]').checked = this.checked;
        }
    });

    clearCompleted.on('click', function () {
        newTodoContainer.find('li.completed').remove();
        countLeft();

    });

    window.onhashchange = routing;

    function routing() {
        var items;
        var itemsHidden;
        var index = 0;
        var itemsLength ;
        var itemsHiddenLength;

        var selectedItem = $('.selected');
        selectedItem.removeClass('selected');

        if (location.hash === '#/completed'){
            selectedItem = $('a[href="#/completed"]');
            selectedItem.addClass('selected');

            itemsHidden = newTodoContainer.find('li.hidden');
            items = newTodoContainer.find('li:not(.completed)');
            itemsLength = items.length;
            itemsHiddenLength = itemsHidden.length;
            for (index; index < itemsHiddenLength ; index++) {
                $(itemsHidden[index]).removeClass('hidden');
            }
            for (index = 0; index < itemsLength ; index++) {
                $(items[index]).addClass('hidden');
            }
        } else if (location.hash === '#/active'){
            selectedItem = $('a[href="#/active"]');
            selectedItem.addClass('selected');

            itemsHidden = newTodoContainer.find('li.hidden');
            items = newTodoContainer.find('li.completed');
            itemsLength = items.length;
            itemsHiddenLength = itemsHidden.length;

            for (index; index < itemsHiddenLength ; index++) {
                $(itemsHidden[index]).removeClass('hidden');
            }
            for (index = 0; index < itemsLength ; index++) {
                $(items[index]).addClass('hidden');
            }
        } else {
            selectedItem = $('a[href="#/"]');
            selectedItem.addClass('selected');

            itemsHidden = newTodoContainer.find('li.hidden');
            itemsHiddenLength = itemsHidden.length;

            for (index; index < itemsHiddenLength ; index++) {
                $(itemsHidden[index]).removeClass('hidden');
            }
        }
    }

    routing();
    function addElement(itemName) {
        var newLi = $('<li/>');
        var newDiv = $('<div/>',{class:"view"});
        var newInputCheckbox = $('<input/>',{type:"checkbox", class: "toggle"});
        var newInputEdit = $('<input/>',{class:"edit"});
        var newLabel = $('<label/>');
        var newButton = $('<button/>',{class:"destroy"});
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

        newButton.on('click', function _func(){
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

        newInputEdit.on('keydown', function (){
            if (e.keyCode === 13) {
                editingListener();
            }
        });


        return newLi;
    }


    function countLeft() {
        var newTodoContainer = RootEle.find('.todo-list');
        var totalNumber = newTodoContainer.children().length;
        var completedNumber = newTodoContainer.find('li.completed');

        RootEle.find('span > strong').html(totalNumber - (completedNumber ? completedNumber.length : 0));
    }
});

(function () {

    var curentIDNumber = 0, currentID;

    $('#create-new-todo').click(function() {

        currentID = 'todo-list-' + curentIDNumber ;

        $( ".todoapp" ).append( '<div id="' + currentID + '">' +
            '<header class="header">' +
                '<h1>todos</h1>' +
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
        ToDo (currentID);
    });
})();
