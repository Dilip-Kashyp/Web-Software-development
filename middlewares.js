import * as sessionService from "./sessionService.js";

const accessControlMiddleware = async (c, next) => {
  const authenticated = c.user;
  if (!authenticated) {
    return c.text("You have not authenticated!", 401);
  }

  await next();
};

const addUserToContextMiddleware = async (c, next) => {
  c.user = await sessionService.getUserFromSession(c);
  await next();
};

export { accessControlMiddleware, addUserToContextMiddleware };