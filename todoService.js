const createTodo = async (userId, todo) => {
    todo.id = crypto.randomUUID();
  
    const kv = await Deno.openKv();
    await kv.set(["todos", userId, todo.id], todo);
  };

const listTodo = async (userId) => {
    const kv = await Deno.openKv();
    const entries = await kv.list({ prefix: ["todos", userId] });
    const todos = [];
    for await (const entry of entries) {
        todos.push(entry.value);
    }
    return todos;
}

const getTodo = async (userId, id) => {
    const kv = await Deno.openKv();
    const todo = await kv.get(["todos", userId, id]);
    return todo?.value ?? {};
}

const updatedTodo = async (userId, id, todo) => {
    todo.id = id;
    const kv = await Deno.openKv();
    await kv.set(["todos", userId, id], todo);
  };

const deletedTodo = async (userId, id) => {
    const kv = await Deno.openKv();
    await kv.delete(["todos", userId, id]);
}

export { createTodo, listTodo, getTodo, updatedTodo, deletedTodo }