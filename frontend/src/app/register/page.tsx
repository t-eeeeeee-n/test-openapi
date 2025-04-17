'use client';

import { useState } from 'react';
import { useRegister } from '@/api/auth/auth';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        registerMutation.mutate({
            data: {name, email, password},
        })
    };

    const registerMutation = useRegister({
        mutation: {
            onSuccess: (data) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                alert('登録成功');
            },
            onError: (err) => {
                console.error('Register error:', err);
                alert('登録失敗');
            }
        }
    })

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-xl font-bold">新規登録</h1>
            <input className="border p-2 rounded w-full" placeholder="名前" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleRegister}>登録</button>
        </main>
    );
}
