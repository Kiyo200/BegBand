export type AuthUser = {
    id?: number;
    username: string;
    email?: string;
};

const KEY = 'begband-user';

export function getUser(): AuthUser | null {
    try {
        const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
        return null;
    }
}

export function setUser(user: AuthUser, persistent = true) {
    try {
        (persistent ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(user));
    } catch {
        return;
    }
}

export function clearUser() {
    try {
        localStorage.removeItem(KEY);
        sessionStorage.removeItem(KEY);
    } catch {
        return;
    }
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
    let res: Response;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch {
        throw new Error('Nem érhető el a szerver. Fut a backend?');
    }
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message ?? `Hiba történt (${res.status}).`);
    }
    return data as T;
}

export function login(identifier: string, password: string) {
    return postJson<AuthUser>('/api/auth/login', { identifier, password });
}

export function register(username: string, email: string, password: string) {
    return postJson<AuthUser>('/api/auth/register', { username, email, password });
}
