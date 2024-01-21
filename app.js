import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import * as authController from "./authController.js";
import * as mainController from "./mainController.js";
import * as todoController from "./todoController.js";
import * as middlewares from "./middlewares.js";

const app = new Hono();

app.use("*", middlewares.addUserToContextMiddleware);
app.use("/todos/*", middlewares.accessControlMiddleware);

app.get("/", mainController.showMain);
app.get("/auth/login", authController.showLoginForm);
app.get("/auth/register", authController.showRegistrationForm);
app.get("/todos", todoController.showForm);
app.get("todos/:id", todoController.showTodo);
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);
app.post("/auth/logout", authController.logoutUser);
app.post("/todos", todoController.createTodos);
app.post("/todos/:id", todoController.updateTodo);
app.post("/todos/:id/delete", todoController.deleteTodo);


export default app;