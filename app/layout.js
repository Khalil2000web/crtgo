// app/layout.js
import './globals.css';

export const metadata = {
  title: 'My Site Builder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
