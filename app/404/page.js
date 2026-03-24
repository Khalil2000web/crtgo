import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:px-8 bg-gradient-to-br from-orange-50 to-white">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <Link href="/" className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-600 hover:text-black transition-colors text-center">
           HOME
        </Link>
    </div>
  );
}