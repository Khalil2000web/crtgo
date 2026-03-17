// app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My Site Builder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}