import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
import * as todoServices from "./todoService.js";

const showForm = async (c) => {
    console.log(c.user.id);
    return c.html(eta.render("todos.eta", { todos: await todoServices.listTodo(c.user.id) }),);
};  

const createTodos = async (c) => {
    const body = await c.req.parseBody();
    await todoServices.createTodo(c.user.id, body);
    return c.redirect("/todos");
  };

const showTodo = async (c) => {
    const id = c.req.param("id");   
    return c.html(
        eta.render("todo.eta", { todo: await todoServices.getTodo(c.user.id, id) }),
    );
};

const updateTodo = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.parseBody();
    await todoServices.updatedTodo(c.user.id, id, body);
    return c.redirect(`/todos/${id}`);
  };

const deleteTodo = async (c) => {
    const id = c.req.param("id");
    await todoServices.deletedTodo(c.user.id, id);
    return c.redirect("/todos");
}
export { showForm, createTodos, showTodo, updateTodo, deleteTodo }