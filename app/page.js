// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-6">Build Your Own Website</h1>
      <p className="mb-6">Sign up, pick a template, fill in your data, and your site will be live!</p>
      <Link href="/signup" className="bg-white text-black px-6 py-3 rounded-lg font-bold">
        Get Started
      </Link>
    </div>
  );
}