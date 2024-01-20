const WEEK_IN_MILLISECONDS = 604800000;
import {
    getSignedCookie,
    deleteCookie,
    setSignedCookie,
  } from "https://deno.land/x/hono@v3.7.4/helper.ts";
  
const secret = "sec";
const createSession = async (c, user) => {
    const sessionId = crypto.randomUUID();
    await setSignedCookie(c, "sessionId", sessionId, secret, {
        path: "/",
    });
    const kv = await Deno.openKv();
    await kv.set(["sessionId", sessionId], user, {
        expireIn : WEEK_IN_MILLISECONDS,
    });
}
  const getUserFromSession = async (c) => {
    const sessionId = await getSignedCookie(c, secret, "sessionId");
    if (!sessionId) {
      console.log("no session id")
      return null;
    }
    
    const kv = await Deno.openKv();
    const user = await kv.get(["sessionId", sessionId]);
    const foundUser = user?.value ?? null;
    if (!foundUser) {
      return null;
    }
  
    await kv.set(["sessionId", sessionId], foundUser, {
      expireIn: WEEK_IN_MILLISECONDS,
    });
  
    return foundUser;
  };
  const deleteSession = async (c) => {
    const sessionId = await getSignedCookie(c, secret, "sessionId");
    if (!sessionId) {
      return;
    }
  
    deleteCookie(c, "sessionId", {
      path: "/",
    });
  
    const kv = await Deno.openKv();
    await kv.delete(["sessionId", sessionId]);
  };
  export {getUserFromSession, deleteSession, createSession}