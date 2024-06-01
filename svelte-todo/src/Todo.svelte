<script>
    import { onMount } from 'svelte';
    import axios from 'axios';

    let todos = [];
    let newTask = '';

    onMount(async () => {
        const response = await axios.get('http://localhost:3000/todos');
        todos = response.data;
    });

    const addTodo = async () => {
        if (newTask.trim()) {
            const response = await axios.post('http://localhost:3000/todos', { task: newTask, completed: false });
            todos = [...todos, response.data];
            newTask = '';
        }
    };

    const toggleTodo = async (id) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            const response = await axios.put(`http://localhost:3000/todos/${id}`, { completed: !todo.completed });
            todos = todos.map(t => (t.id === id ? response.data : t));
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        todos = todos.filter(todo => todo.id !== id);
    };
</script>



<div class="mb-4 flex flex-row justify-between items-center">
    <div class="flex flex-row justify-start">
        <h1 class="text-5xl font-bold mb-4">Todo List</h1>
    </div>
    <div class="flex flex-row
    ">
        <input
        type="text"
        bind:value={newTask}
        placeholder="Add new task"
        class="border p-2 rounded mr-2"
    />
        <button
        on:click={addTodo}
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
        Add
    </button>
    </div>



</div>

<ul>
    {#each todos as todo (todo.id)}
        <li>
            <div class="flex items-center justify-between p-4 bg-white shadow-md rounded-lg my-2">
                <div class="flex items-center">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        on:change={() => toggleTodo(todo.id)}
                        class="mr-4"
                    />
                    <p>id:</p>
                    <span class="m-1">{todo.id} -</span>
                    <p>Task: </p>
                    <span class={todo.completed ? 'line-through' : '', 'm-1'}>{todo.task}</span>
                </div>
                <button
                    on:click={() => deleteTodo(todo.id)}
                    class="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </li>
    {/each}
</ul>
<div class="flex items-center justify-center"><p>Come on! Start your first task!</p></div>


<style>
    .line-through {
        text-decoration: line-through;
    }
</style>
