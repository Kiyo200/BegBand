import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, setUser } from '../../auth.ts';
import './auth.css';

type Mode = 'login' | 'register';

type Fields = {
    identifier: string;
    username: string;
    email: string;
    password: string;
    confirm: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = { identifier: '', username: '', email: '', password: '', confirm: '' };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode: Mode, f: Fields): Errors {
    const errors: Errors = {};
    if (mode === 'login') {
        if (!f.identifier.trim()) errors.identifier = 'Add meg a felhasználóneved vagy az e-mail címed.';
        if (!f.password) errors.password = 'Add meg a jelszavad.';
        return errors;
    }
    const username = f.username.trim();
    if (!username) errors.username = 'Adj meg egy felhasználónevet.';
    else if (username.length < 3) errors.username = 'Legalább 3 karakter legyen.';
    else if (username.length > 50) errors.username = 'Legfeljebb 50 karakter lehet.';
    else if (!/^[\p{L}0-9._-]+$/u.test(username)) errors.username = 'Csak betű, szám, pont, kötőjel és aláhúzás lehet benne.';
    if (!f.email.trim()) errors.email = 'Add meg az e-mail címed.';
    else if (!emailPattern.test(f.email.trim())) errors.email = 'Ez nem érvényes e-mail cím.';
    if (f.password.length < 8) errors.password = 'A jelszó legalább 8 karakter legyen.';
    if (!f.confirm) errors.confirm = 'Írd be újra a jelszót.';
    else if (f.confirm !== f.password) errors.confirm = 'A két jelszó nem egyezik.';
    return errors;
}

function passwordStrength(password: string): { score: number; label: string } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-zá-ű]/.test(password) && /[A-ZÁ-Ű]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^\p{L}0-9]/u.test(password)) score++;
    const level = Math.min(4, score);
    const labels = ['Nagyon gyenge', 'Gyenge', 'Közepes', 'Erős', 'Nagyon erős'];
    return { score: level, label: labels[level] };
}

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </svg>
    );
}

function Field({
    id,
    label,
    type = 'text',
    value,
    error,
    autoComplete,
    onChange,
    onBlur,
    children,
}: {
    id: keyof Fields;
    label: string;
    type?: string;
    value: string;
    error?: string;
    autoComplete: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    children?: ReactNode;
}) {
    return (
        <div className={`auth-field${error ? ' has-error' : ''}`}>
            <label htmlFor={`auth-${id}`}>{label}</label>
            <div className="auth-input-wrap">
                <input
                    id={`auth-${id}`}
                    name={id}
                    type={type}
                    value={value}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? `auth-${id}-error` : undefined}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                />
                {children}
            </div>
            {error && (
                <p className="auth-error" id={`auth-${id}-error`}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function AuthPage({ mode }: { mode: Mode }) {
    const navigate = useNavigate();
    const [fields, setFields] = useState<Fields>(emptyFields);
    const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const isLogin = mode === 'login';
    const errors = validate(mode, fields);
    const visibleError = (key: keyof Fields) => (submitted || touched[key] ? errors[key] : undefined);
    const strength = passwordStrength(fields.password);

    const update = (key: keyof Fields) => (value: string) => {
        setFields((prev) => ({ ...prev, [key]: value }));
    };
    const touch = (key: keyof Fields) => () => setTouched((prev) => ({ ...prev, [key]: true }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (Object.keys(errors).length > 0) return;
        setLoading(true);
        setServerError(null);
        try {
            if (isLogin) {
                const user = await login(fields.identifier.trim(), fields.password);
                setUser(user, remember);
            } else {
                const user = await register(fields.username.trim(), fields.email.trim(), fields.password);
                setUser(user);
            }
            navigate('/');
        } catch (err) {
            setServerError(err instanceof Error ? err.message : 'Ismeretlen hiba.');
        } finally {
            setLoading(false);
        }
    };

    const passwordToggle = (
        <button
            type="button"
            className="auth-eye"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}
            aria-pressed={showPassword}
        >
            <EyeIcon open={!showPassword} />
        </button>
    );

    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-card">
                    <header className="auth-head">
                        <h1>{isLogin ? 'Jelentkezz be' : 'Hozd létre a fiókod'}</h1>
                        <p>
                            {isLogin
                                ? 'Add meg az adataidat a folytatáshoz.'
                                : 'Pár adat, és már bent is vagy.'}
                        </p>
                    </header>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {isLogin ? (
                            <Field
                                id="identifier"
                                label="Felhasználónév vagy e-mail"
                                value={fields.identifier}
                                error={visibleError('identifier')}
                                autoComplete="username"
                                onChange={update('identifier')}
                                onBlur={touch('identifier')}
                            />
                        ) : (
                            <>
                                <Field
                                    id="username"
                                    label="Felhasználónév"
                                    value={fields.username}
                                    error={visibleError('username')}
                                    autoComplete="username"
                                    onChange={update('username')}
                                    onBlur={touch('username')}
                                />
                                <Field
                                    id="email"
                                    label="E-mail cím"
                                    type="email"
                                    value={fields.email}
                                    error={visibleError('email')}
                                    autoComplete="email"
                                    onChange={update('email')}
                                    onBlur={touch('email')}
                                />
                            </>
                        )}

                        <Field
                            id="password"
                            label="Jelszó"
                            type={showPassword ? 'text' : 'password'}
                            value={fields.password}
                            error={visibleError('password')}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            onChange={update('password')}
                            onBlur={touch('password')}
                        >
                            {passwordToggle}
                        </Field>

                        {!isLogin && fields.password && (
                            <div className={`auth-strength level-${strength.score}`} aria-live="polite">
                                <div className="auth-strength-bars">
                                    {[0, 1, 2, 3].map((i) => (
                                        <span key={i} className={i < strength.score ? 'on' : ''} />
                                    ))}
                                </div>
                                <span className="auth-strength-label">{strength.label}</span>
                            </div>
                        )}

                        {!isLogin && (
                            <Field
                                id="confirm"
                                label="Jelszó még egyszer"
                                type={showPassword ? 'text' : 'password'}
                                value={fields.confirm}
                                error={visibleError('confirm')}
                                autoComplete="new-password"
                                onChange={update('confirm')}
                                onBlur={touch('confirm')}
                            />
                        )}

                        {isLogin && (
                            <div className="auth-row">
                                <label className="auth-check">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <span className="auth-check-box" aria-hidden="true" />
                                    Maradjak bejelentkezve
                                </label>
                                <button type="button" className="auth-link">
                                    Elfelejtett jelszó?
                                </button>
                            </div>
                        )}

                        {serverError && (
                            <p className="auth-error" role="alert">
                                {serverError}
                            </p>
                        )}

                        <button type="submit" className="auth-submit" disabled={loading}>
                            {loading && <span className="auth-spinner" aria-hidden="true" />}
                            {isLogin ? 'Bejelentkezés' : 'Fiók létrehozása'}
                        </button>
                    </form>

                    {isLogin && (
                        <button type="button" className="auth-secondary" onClick={() => navigate('/register')}>
                            Regisztráció
                        </button>
                    )}
                </section>
            </div>
        </main>
    );
}
