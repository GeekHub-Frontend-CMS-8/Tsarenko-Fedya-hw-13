jQuery(function ($) {
    let todoes = [];
    let todoList = $('.todoes');
    let input = $('.add-todo');
    let add = $('.add');
    let text = $('.info')

    function newTodo (value) {
        todoes.push (value);
    }

    function renderTodo () {
        todoList.empty();
        $.each(todoes, function (i) {
            todoList.append(`
            <li>
                <p class="info">${this}</p>
                <button class="delete" data-index="${i}">delete</button>  
                  <input type="checkbox" class="check" data-index="${i}">
                  <div  class="done" data-index="${i}" hidden>
                      <i class="fas fa-check"></i>
                  </div>
                <button class="edit">Edit</button>
            </li>
            `);
        });
    }

    function deleteTodo (index) {
        todoes.splice(index, 1);
        renderTodo();
    }

    function endEditing () {
        $('#todo').on('keydown', text, function (e) {
            if (e.keyCode == 13)  {
                $(this).prop('contenteditable', false);
            }

        });
    }


    input.on('keydown', function (e) {
        if (e.keyCode == 13)  {
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
        $(this).siblings(".done").data('index').prop('hidden', false);
    });

    $('#todo').on('click', '.edit', function(){
        $(this).siblings(text).prop('contenteditable', true);
        text.on('change'), function () {
            text.prop(;)
        }
    });

});