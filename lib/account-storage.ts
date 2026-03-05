import type { GemType } from "@/lib/gem-data";
import type { GitReportType } from "@/lib/git-certification";

export const AUTH_USER_KEY = "pp-auth-user";
export const ORDERS_KEY = "pp-orders";
export const USERS_KEY = "pp-users";
export const CART_SELECTION_KEY = "pp-cart-selection";

export const DEMO_ACCOUNT = {
  name: "Demo Customer",
  email: "demo@pradapprada.com",
  password: "Pradap123!",
};

export const QUICK_LOGIN_ACCOUNT = {
  name: "Quick Login",
  email: "you@example.com",
  password: "Pradap123!",
};

export interface AuthUser {
  name?: string;
  email: string;
  loggedInAt: string;
}

export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface StoredOrder {
  id: string;
  createdAt: string;
  userEmail: string;
  designType: string;
  gemstone: string;
  gemType?: GemType;
  gitCertificationEnabled?: boolean;
  gitReportType?: GitReportType;
  gitCertificationLabel?: string;
  productionStatus?: "in-production" | "quality-check" | "completed";
  shippingStatus?: "pending" | "ready-to-ship" | "in-transit" | "delivered";
  chainStyle?: string;
  pendantStyle?: string;
  total: number;
  status: "confirmed";
  isGift: boolean;
}

export interface StoredCartSelection {
  type: string;
  gemType?: GemType;
  ringSize?: string;
  braceletSize?: string;
  gitCertificationEnabled?: boolean;
  gitReportType?: GitReportType;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isLegacyDesignType(designType: string) {
  const normalized = designType.trim().toLowerCase();
  return (
    normalized.includes("signature bracelet") ||
    normalized.includes("bespoke necklace") ||
    normalized.includes("bespoke ring") ||
    normalized.includes("bespoke earring") ||
    normalized.includes("lotus ring") ||
    normalized.includes("champak earring") ||
    normalized.includes("signature necklace")
  );
}

function readUsers(): RegisteredUser[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as RegisteredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: RegisteredUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function ensureDefaultUsers() {
  if (!isBrowser()) return;
  const users = readUsers();
  const defaults: RegisteredUser[] = [
    {
      name: QUICK_LOGIN_ACCOUNT.name,
      email: normalizeEmail(QUICK_LOGIN_ACCOUNT.email),
      password: QUICK_LOGIN_ACCOUNT.password,
      createdAt: new Date().toISOString(),
    },
    {
      name: DEMO_ACCOUNT.name,
      email: normalizeEmail(DEMO_ACCOUNT.email),
      password: DEMO_ACCOUNT.password,
      createdAt: new Date().toISOString(),
    },
  ];

  const existingEmails = new Set(users.map((user) => normalizeEmail(user.email)));
  const missingDefaults = defaults.filter((entry) => !existingEmails.has(entry.email));
  if (missingDefaults.length === 0) return;

  writeUsers([...missingDefaults, ...users]);
}

export function getRegisteredUsers(): RegisteredUser[] {
  ensureDefaultUsers();
  return readUsers();
}

export function signUpUser(name: string, email: string, password: string) {
  if (!isBrowser()) return { ok: false as const, message: "Browser only" };

  const normalizedName = name.trim();
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = password.trim();

  if (!normalizedName || !normalizedEmail || !normalizedPassword) {
    return { ok: false as const, message: "Please complete all fields" };
  }

  const users = getRegisteredUsers();
  const exists = users.some((user) => normalizeEmail(user.email) === normalizedEmail);
  if (exists) {
    return { ok: false as const, message: "This email is already registered" };
  }

  const newUser: RegisteredUser = {
    name: normalizedName,
    email: normalizedEmail,
    password: normalizedPassword,
    createdAt: new Date().toISOString(),
  };

  writeUsers([newUser, ...users]);
  return { ok: true as const, user: newUser };
}

export function authenticateUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = password.trim();
  const user = getRegisteredUsers().find(
    (entry) => normalizeEmail(entry.email) === normalizedEmail && entry.password === normalizedPassword
  );

  if (!user) {
    return { ok: false as const, message: "Invalid email or password" };
  }

  setAuthUser({
    name: user.name,
    email: user.email,
    loggedInAt: new Date().toISOString(),
  });

  return { ok: true as const, user };
}

export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser) {
  if (!isBrowser()) return;
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(AUTH_USER_KEY);
}

export function getOrders(): StoredOrder[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(ORDERS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredOrder[];
    if (!Array.isArray(parsed)) return [];

    const sanitized = parsed.filter((order) => !isLegacyDesignType(order.designType));
    if (sanitized.length !== parsed.length) {
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(sanitized));
    }
    return sanitized;
  } catch {
    return [];
  }
}

export function addOrder(order: StoredOrder) {
  if (!isBrowser()) return;
  const current = getOrders();
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...current]));
}

export function getCartSelection(): StoredCartSelection | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(CART_SELECTION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StoredCartSelection;
    if (!parsed || typeof parsed !== "object" || typeof parsed.type !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setCartSelection(selection: StoredCartSelection) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_SELECTION_KEY, JSON.stringify(selection));
}

export function clearCartSelection() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CART_SELECTION_KEY);
}
