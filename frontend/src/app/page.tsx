'use client';

import { useState } from 'react';
import {useDeleteUser, useGetUsers, useUpdateUser} from '@/api/users/users';

export default function HomePage() {
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState('');

    const {
        data: users,
        refetch,
    } = useGetUsers();

    const deleteMutation = useDeleteUser({
        mutation: {
            onSuccess: () => {
                refetch();
            },
        },
    });

    const updateMutation = useUpdateUser({
        mutation: {
            onSuccess: () => {
                console.log('✅ 更新完了');
                setEditingUserId(null);
                refetch();
            },
            onError: (error) => {
                console.error('❌ 更新失敗:', error);
            },
        },
    });

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-xl font-semibold mt-6">ユーザー一覧</h1>
            {users?.map((user) => (
                <li key={user.id} className="border p-2 rounded shadow flex justify-between items-center">
                    {editingUserId === user.id ? (
                        <>
                            <input
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                className="border h-full p-1 rounded mr-2"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        updateMutation.mutate({ data: { id: user.id, name: editedName } })
                                    }
                                    className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2"
                                >
                                    保存
                                </button>
                                <button
                                    onClick={() => setEditingUserId(null)}
                                    className="text-sm text-gray-500"
                                >
                                    キャンセル
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span>
                              <strong>{user.name}</strong>（{user.email}）ID: {user.id}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingUserId(user.id);
                                        setEditedName(user.name);
                                    }}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    編集
                                </button>
                                <button
                                    onClick={() => deleteMutation.mutate({ userId: user.id })}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    削除
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </main>
    );
}
