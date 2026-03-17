// components/Navbar.js
'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b border-white/20">
      <Link href="/" className="font-bold text-xl">My Builder</Link>
      <div className="space-x-4">
        <Link href="/signup" className="hover:underline">Sign Up</Link>
        <Link href="/login" className="hover:underline">Login</Link>
      </div>
    </nav>
  );
}