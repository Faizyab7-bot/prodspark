import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar.tsx';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { Footer } from './components/Footer.tsx';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

function App() {
  return (
    <HelmetProvider>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </ThemeProvider>
      </ClerkProvider>
    </HelmetProvider>
  );
}

export default App;
