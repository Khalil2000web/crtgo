// app/layout.js
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'My Site Builder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <main className="">{children}</main>
        <Analytics/>
      </body>
    </html>
  );
}
