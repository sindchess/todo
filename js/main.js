// Функция создания нового html - элемента
function create(s)
{
    return document.createElement(s);
}

// Класс to do list
class Todo
{
    constructor()
    {
        //Верхний блок
        this.colorStyle = 'red';
        this.headBlock = create("div");
        this.headBlockText = create("h2");
        this.btnOpenInputBlock = create("button");
        this.btnCleanTask = create("button");
        this.headBlock.classList.add("head-block");
        this.headBlockText.classList.add("head-block-text");
        this.btnOpenInputBlock.classList.add("btn-open-input-block");
        this.btnCleanTask.classList.add("btn-clean-tasks");
        this.headBlockText.innerHTML = 'To do list';
        this.btnOpenInputBlock.innerHTML = 'add';
        this.btnCleanTask.innerHTML = 'clean';

        this.headBlock.appendChild(this.btnOpenInputBlock);
        this.headBlock.appendChild(this.headBlockText);
        this.headBlock.appendChild(this.btnCleanTask);


        // //Нижний блок, блок добавления нового задания
        this.inputBlock = create("div");
        this.fieldInput = create("input");
        this.btnTaskAdd = create("button");
        this.inputBlock.classList.add("input-block");
        this.fieldInput.classList.add("field-input");
        this.btnTaskAdd.classList.add("btn-task-add");
        this.btnTaskAdd.innerHTML = '&#10010;'

        this.inputBlock.appendChild(this.fieldInput);
        this.inputBlock.appendChild(this.btnTaskAdd);


        this.todoBlock = create("div");
        this.todoBlock.classList.add("todo-block");

        this.todoBlock.appendChild(this.headBlock);
        this.todoBlock.appendChild(this.inputBlock);

        //События
        this.btnOpenInputBlock.addEventListener("click", () => {
            this.openInputBlock();


        if (this.colorStyle == 'blue')
            this.fieldInput.style.borderColor = 'rgb(89, 204, 250)';

        if (this.colorStyle == 'red')
            this.fieldInput.style.borderColor = 'rgb(211, 66, 66)';

        });

        this.btnTaskAdd.addEventListener("click", () => {
            let input = this.fieldInput.value;
            if (input != "" && input != undefined)
                this.addTask(this.fieldInput.value);
            this.fieldInput.value = '';
        });

        this.todoBlock.addEventListener("click", function(event) {
            if (event.target.className == 'task-remove')
                event.target.parentElement.remove();
            if (event.target.className == 'task-completion')
            {
                event.target.innerHTML = '&#10004';
                event.target.nextSibling.style.textDecoration = 'line-through';
            }
        });

        this.btnCleanTask.addEventListener("click", () => {
            let elem = this.todoBlock.children[0];
            while (elem != this.inputBlock)
            {
                let tmp = elem;
                elem = elem.nextSibling;

                if (tmp.children[1].style.textDecoration == 'line-through')
                {
                    tmp.remove();
                }
            }
        });
    }

    openInputBlock()
    {
        this.inputBlock.style.display = 'flex';
    }

    changeColor(color)
    {
        if (color == 'blue')
        {
            this.colorStyle = 'blue';
            this.headBlock.classList.add('blue-style-back');
            this.inputBlock.classList.add('blue-style-border')
        }
        else if (color == 'green')
        {
            this.colorStyle = 'green';
            this.headBlock.classList.add('green-style-back');
            this.inputBlock.classList.add('green-style-border');
        }
    }

    addTask(name)
    {
        this.taskBlock = create("div");
        this.taskBlock.classList.add("task-block");
        let taskText = create("div");
        taskText.classList.add("task-text")
        let taskCompletion = create("div");
        taskCompletion.classList.add("task-completion");
        let taskRemove = create("div");
        taskRemove.classList.add("task-remove");
        taskRemove.innerHTML = '&#10006;'
        taskText.innerHTML = name;
        if (this.colorStyle == 'blue') {
            this.taskBlock.style.borderColor = 'rgb(89, 204, 250)';
        }
        else if (this.colorStyle == 'green') {
            this.taskBlock.style.borderColor = 'rgb(65, 221, 143)';
        }
        
        this.taskBlock.appendChild(taskCompletion);
        this.taskBlock.appendChild(taskText);
        this.taskBlock.appendChild(taskRemove);
        this.todoBlock.insertBefore(this.taskBlock, this.inputBlock);
        this.taskBlock.style.animationName = "show";
    }
}


let t1 = new Todo();
let t2 = new Todo();
let t3 = new Todo();

let todos = document.querySelector('.todos');

t2.changeColor('blue')
t3.changeColor('green')

t1.headBlockText.innerHTML = 'Most important';
t2.headBlockText.innerHTML = 'Middle important';
t3.headBlockText.innerHTML = 'Low important'


todos.appendChild(t1.todoBlock);
todos.appendChild(t2.todoBlock);
todos.appendChild(t3.todoBlock);

