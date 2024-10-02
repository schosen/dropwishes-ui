import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const SESSION_ID_COOKIE = "sessionId";

export const getSessionId = () => {
  let sessionId = Cookies.get(SESSION_ID_COOKIE);
  if (!sessionId) {
    sessionId = uuidv4();
    Cookies.set(SESSION_ID_COOKIE, sessionId, {
      secure: true,
      sameSite: "Strict",
    });
  }
  return sessionId;
};

export const clearSessionId = () => {
  Cookies.remove(SESSION_ID_COOKIE);
};
