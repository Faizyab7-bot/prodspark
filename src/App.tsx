import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar.tsx';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { Footer } from './components/Footer.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from './pages/Home.tsx';
import { Products } from './pages/Products.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { SubmitProduct } from './pages/SubmitProduct.tsx';
import { SignInPage } from './pages/SignIn.tsx';
import { SignUpPage } from './pages/SignUp.tsx';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/submit" element={
                  <>
                    <SignedIn><SubmitProduct /></SignedIn>
                    <SignedOut><RedirectToSignIn /></SignedOut>
                  </>
                } />
                <Route path="/sign-in/*" element={<SignInPage />} />
                <Route path="/sign-up/*" element={<SignUpPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
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
