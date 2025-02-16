'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/admin-auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    try {

      const isUserAdmin = await isAdmin(email, password);
      console.log("Admin login result:", isUserAdmin); // ✅ 로그인 결과 로그 출력

      if (!isUserAdmin) {
        throw new Error('Not authorized');
      }

      console.log("Login successful, redirecting to /admin");
      router.push('/admin'); // 로그인 성공 후 관리자 페이지로 이동
    } catch (err: any) {
      console.error("Login error:", err.message || err);
      setError(err.message || 'Access denied: Admins only');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </div>
    </div>
  );
}
