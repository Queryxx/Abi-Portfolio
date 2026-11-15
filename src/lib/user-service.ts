import { query } from "./db";
import { hashPassword, verifyPassword } from "./auth";

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

// In-memory fallback user store when database is not connected
const memoryUsers: Map<string, UserRecord> = new Map();

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      "SELECT id, username, email, name, password_hash, created_at FROM users WHERE LOWER(email) = $1 LIMIT 1",
      [normalizedEmail],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
    }
  } catch (error) {
    console.warn("Database not ready for user query, checking memory store:", error);
  }

  for (const user of memoryUsers.values()) {
    if (user.email.toLowerCase() === normalizedEmail) {
      return user;
    }
  }

  return null;
}

export async function findUserByUsername(username: string): Promise<UserRecord | null> {
  const normalizedUsername = username.toLowerCase().trim();

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      "SELECT id, username, email, name, password_hash, created_at FROM users WHERE LOWER(username) = $1 LIMIT 1",
      [normalizedUsername],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
    }
  } catch (error) {
    console.warn("Database not ready for user query, checking memory store:", error);
  }

  for (const user of memoryUsers.values()) {
    if (user.username.toLowerCase() === normalizedUsername) {
      return user;
    }
  }

  return null;
}

export async function findUserByIdentifier(identifier: string): Promise<UserRecord | null> {
  const clean = identifier.trim();
  if (clean.includes("@")) {
    return findUserByEmail(clean);
  }

  // Try username first, then email
  const byUsername = await findUserByUsername(clean);
  if (byUsername) return byUsername;

  return findUserByEmail(clean);
}

export async function createUser(
  username: string,
  email: string,
  plainPassword: string,
  name?: string,
): Promise<UserRecord> {
  const normalizedUsername = username.toLowerCase().trim();
  const normalizedEmail = email.toLowerCase().trim();
  const passwordHash = await hashPassword(plainPassword);
  const userName = name?.trim() || username;

  try {
    const res = await query<{
      id: string;
      username: string;
      email: string;
      name: string;
      password_hash: string;
      created_at: string;
    }>(
      `INSERT INTO users (username, email, password_hash, name, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, username, email, name, password_hash, created_at`,
      [normalizedUsername, normalizedEmail, passwordHash, userName],
    );

    if (res && res.rows.length > 0) {
      const row = res.rows[0]!;
      const user: UserRecord = {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.name,
        passwordHash: row.password_hash,
        createdAt: row.created_at,
      };
      memoryUsers.set(user.id, user);
      return user;
    }
  } catch (error) {
    console.warn("Database not connected for user insert, storing in memory:", error);
  }

  // Fallback in-memory user
  const fallbackUser: UserRecord = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "user-1",
    username: normalizedUsername,
    email: normalizedEmail,
    name: userName,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  memoryUsers.set(fallbackUser.id, fallbackUser);
  return fallbackUser;
}

export async function validateUserCredentials(
  identifier: string,
  plainPassword: string,
): Promise<UserRecord | null> {
  const user = await findUserByIdentifier(identifier);
  if (!user) return null;

  const valid = await verifyPassword(plainPassword, user.passwordHash);
  if (!valid) return null;

  return user;
}
