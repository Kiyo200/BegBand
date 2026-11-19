import { getUser } from '../../auth.ts';

export default function RootPage() {
    const user = getUser();
    return (
        <>
            {user && (
                <div
                    style={{
                        position: 'fixed',
                        top: 12,
                        right: 12,
                        padding: '8px 14px',
                        border: '1px solid #d6d2e6',
                        borderRadius: 10,
                        background: '#fff',
                        color: '#17142a',
                    }}
                >
                    {user.username}
                </div>
            )}
            <h1>root</h1>
        </>
    )
}
