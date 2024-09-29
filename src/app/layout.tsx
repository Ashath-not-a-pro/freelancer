import { UserProvider } from '@/context/userContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-white'>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
