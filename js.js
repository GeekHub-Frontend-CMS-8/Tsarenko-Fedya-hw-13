jQuery(function ($) {
    let todoes = [];
    let todoList = $('.todoes');
    let input = $('.add-todo');
    let add = $('.add');

    function newTodo (value) {
        todoes.push({text: value,
                    completed: false,
                    editable: false});
    }

    function renderTodo () {
        todoList.empty();
        $.each(todoes, function (i) {
            todoList.append(`
            <li>
                <p class="info" data-index="${i}">${this.text}</p>
                <input type="text"  ${this.editable ? "" : "hidden"} class="edit-input" data-index="${i}">
                <button class="delete" data-index="${i}">delete</button>  
                <div>
                 <input type="checkbox" ${this.completed ? "hidden" : ""} class="check" data-index="${i}">
                  <div  class="done" ${this.completed ? "hidden" : ""} data-index="${i}">
                      <i class="fas fa-check"></i>
                  </div>
                 </div>
                <button class="edit" data-index="${i}">Edit</button>
            </li>
            `);
        });
    }

    function deleteTodo(index) {
        todoes.splice(index, 1);
        renderTodo();
    }

    function doneTodo(value) {
        let index = $(value).data('index');
        todoes[index].completed = true;
        addIcon(value, index);
    }

    function addIcon(value, index) {
        if (todoes[index].completed = true) {
            $(value).siblings().prop('hidden', false);
        }
    }



    input.on('keydown', function (e) {
        if (e.keyCode == 13) {
            newTodo(this.value);
            renderTodo();
            this.value = '';
        }
    });

    add.on('click', function () {
        newTodo(input[0].value);
        renderTodo();
        input[0].value = '';
    });

    $('#todo').on('click', '.delete', function () {
        let index = $(this).data('index');
        deleteTodo(index);
    });

    $('#todo').on('click', '.check', function () {
        $(this).prop('hidden', true);
        doneTodo(this);
    });

    $('#todo').on('click', '.edit', function () {
        beginEdit(this, '.edit-input');
        endEdit(this, '.edit-input');
    });

    function beginEdit(value, sibling) {
        let index = $(value).data('index');
        todoes[index].editable = true;
        if (todoes[index].editable = true) {
            $(value).siblings(sibling).prop('hidden', false);
        }

    }

    function endEdit(value, sibling) {
        $(value).siblings(sibling).on('keydown', function (e) {
            if (e.keyCode == 13) {
                saveEdit(value);
                $(sibling).prop('hidden', true);
                $(sibling)[0].value = "";
            }
        });
    }

    function saveEdit(sibling) {
        saveTodo(sibling);
        console.log(sibling.value);
    }

    function saveTodo (sibling) {
        let index = $(sibling).data('index');
        todoes[index].text = $('.edit-input')[0].value;
        console.log(todoes[index]);
        todoes[index].editable = false;
        renderTodo();
    }


});