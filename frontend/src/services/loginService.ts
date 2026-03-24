import type { IUser } from "../types/IUser.ts";
import { users } from "../mockdata/mockUsers.ts";

const LOGGED_IN_USER_KEY = "LOGGEDINUSER";

type UserWithPassword = IUser & { password: string };

/**
 * Login logic (case-insensitive email)
 */
export const login = (email: string, password: string): IUser | null => {
  const normalizedEmail = email.trim().toLowerCase();

  const foundUser = (users as UserWithPassword[]).find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );

  if (!foundUser) return null;

  const { username, email: userEmail } = foundUser;
  const userWithoutPassword: IUser = { username, email: userEmail };

  localStorage.setItem(
    LOGGED_IN_USER_KEY,
    JSON.stringify(userWithoutPassword)
  );

  return userWithoutPassword;
};

export const logout = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
  sessionStorage.removeItem(LOGGED_IN_USER_KEY);
};

export const getLoggedInUser = (): IUser | null => {
  const stored =
    sessionStorage.getItem(LOGGED_IN_USER_KEY) ??
    localStorage.getItem(LOGGED_IN_USER_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as IUser;
  } catch {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  return !!getLoggedInUser();
};