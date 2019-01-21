jQuery(function ($) {
    let todoes = [];
    let todoList = $('.todoes');
    let input = $('.add-todo');
    let add = $('.add');

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
                <div>
                  <input type="checkbox" class="check" data-index="${i}">
                  <div  class="done" data-index="${i}" hidden>
                      <i class="fas fa-check"></i>
                  </div>
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
        $(this).siblings().prop('hidden', false);
    });

    $('#todo').on('click', '.edit', function(){
        $(this).siblings(".info").prop('contenteditable', true);
        $(this).siblings(".info").on('change'), function f() {
            $('.info').prop('contenteditable', false);
        }
    });

});