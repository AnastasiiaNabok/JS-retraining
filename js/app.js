 $(document).ready();

(function (window) {
    'use strict';

    var newTodoEl = $('#new-todo');
    var newTodoContainer = $('#todo-list');
    var toggleAll = $('.toggle-all');
    var clearCompleted = $('.clear-completed');

    newTodoEl.on('keydown', function (e) {
        var key = e.which || e.keyCode;
        var newTodoElVal = $.trim(newTodoEl.val());
        if (key === 13 && newTodoElVal) {
            newTodoEl.val('');
            newTodoContainer.append(addElement(newTodoElVal));
            routing();
            countLeft();
        }
    });


    toggleAll.on('click', function (e){
        var items;
        var index = 0;
        var itemsLength;
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

    clearCompleted.on('click', function (e) {
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
})(window);

function addElement(itemName) {
    var newLi = $('<li/>');
    var newDiv = $('<div/>',{class:"view"});
    var newInputCheckbox = $('<input/>',{type:"checkbox", class: "toggle"});
    var newInputEdit = $('<input/>',{class:"edit"});
    var newLabel = $('<label/>');
    var newButton = $('<button/>',{class:"destroy"});
    var newTodoContainer = $('#todo-list');
    var newInputCheckboxListener = function (e) {
        newLi.toggleClass('completed');
        countLeft();
    };
    var editingListener = function (e) {
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

    newButton.on('click', function _func(e){
        newInputCheckbox.off('click', newInputCheckboxListener);
        newButton.off('click', _func);
        newLi.remove();
        countLeft();
    });


    newLabel.on('dblclick', function (e) {
        newLi.addClass('editing');
        newInputEdit.focus();
    });

    newInputEdit.on('blur', editingListener);

    newInputEdit.on('keydown', function (e){
        if (e.keyCode === 13) {
            editingListener();
        }
    });


    return newLi;
}


function countLeft() {
    var newTodoContainer = $('#todo-list');
    var totalNumber = newTodoContainer.children().length;
    var completedNumber = newTodoContainer.find('li.completed');

    $('span > strong').html(totalNumber - (completedNumber ? completedNumber.length : 0));
}