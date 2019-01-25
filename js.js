jQuery(function ($) {
    let todoes = [];
    let todoList = $('.todoes');
    let input = $('.add-todo');
    let add = $('.add');
    let more = $('#load-more');

    function newTodo(value) {
        todoes.push({
            title: value,
            completed: false,
            editable: false
        });
    }

    function renderTodo() {
        todoList.empty();
        $.each(todoes, function (i) {
            todoList.prepend(`
            <li style="display: flex; 
                       align-items: center">
                <p class="info" data-index="${i}">${this.title}</p>
                <input type="text"  ${this.editable ? "" : "hidden"} class="edit-input" data-index="${i}">
                <button class="delete" data-index="${i}">delete</button>  
                <div style="display: inline-block">
                 <input type="checkbox" ${this.completed ? "hidden" : ""} class="check" data-index="${i}">
                  <div  class="done" ${this.completed ? "" : "hidden"} data-index="${i}">
                      <i class="fas fa-check"></i>
                  </div>
                 </div>
                <button class="edit" data-index="${i}">Edit</button>
            </li>
            `);
            saveTodoes();
        });
    }

    function saveTodoes() {
        localStorage.setItem('todoList', JSON.stringify(todoes));
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
        let index = $(this).data('index');
        endEdit(this, '.edit-input', index);
    });

    function beginEdit(value, sibling,) {
        let index = $(value).data('index');
        todoes[index].editable = true;
        if (todoes[index].editable = true) {
            $(value).siblings(sibling).prop('hidden', false);
        }

    }

    function endEdit(value, element, index) {
        $(value).siblings(element).on('keydown', function (e) {
            if (e.keyCode == 13) {
                saveEdit(value, element, index);
                $(element).prop('hidden', true);
                $(element)[0].value = "";
            }
        });
    }


    function saveEdit(value, element, index) {
        todoes[index].text = $(value).siblings(element)[0].value;
        todoes[index].editable = false;
        renderTodo();
    }

    $(window).on('load', function () {
        if (localStorage.getItem('todoList') != undefined) {
            todoes = JSON.parse(localStorage.getItem('todoList'));
            renderTodo()
        }
    });

    more.on('click', function () {
        let moreTodoes = new XMLHttpRequest();
        moreTodoes.open('GET', 'https://jsonplaceholder.typicode.com/todos');
        moreTodoes.onload = function () {
            let todoesData = JSON.parse(moreTodoes.responseText);
            addNewHtmlTodoes(todoesData)
        }
        moreTodoes.send();
    });

    function addNewHtmlTodoes(data) {
        for (i = 0; i <= 10; i++) {
            data[i].editable = false;
            todoes.push(data[i]);
        }
        renderTodo();
    }
});