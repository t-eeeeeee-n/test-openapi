'use client';

import { useLogin } from '@/api/auth/auth';
import {useState} from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useLogin({
        mutation: {
            onSuccess: (data) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                alert('ログイン成功');
            },
            onError: (error) => {
                console.error('Login error:', error);
                alert('ログイン失敗');
            },
        },
    });

    const handleLogin = () => {
        loginMutation.mutate({
            data: { email, password },
        });
    };

    return (
        <main className="p-6 space-y-4">
            <h1 className="text-xl font-bold">ログイン</h1>
            <input
                className="border p-2 rounded w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="border p-2 rounded w-full"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                ログイン
            </button>
        </main>
    );
}
