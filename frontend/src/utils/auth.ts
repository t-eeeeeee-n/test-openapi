export const logout = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
    });

    if (res.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('ログアウトしました');
        // router.push('/login'); ← 必要なら
    } else {
        console.error('ログアウト失敗');
    }
};
