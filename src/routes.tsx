import { Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Home } from './pages/Home.tsx';
import { Products } from './pages/Products.tsx';
import { ProductDetails } from './pages/ProductDetails.tsx';
import { SubmitProduct } from './pages/SubmitProduct.tsx';
import { SignInPage } from './pages/SignIn.tsx';
import App from './App.tsx';

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'products/:id',
                element: <ProductDetails />,
            },
            {
                path: 'submit',
                element: (
                    <>
                        <SignedIn>
                            <SubmitProduct />
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn />
                        </SignedOut>
                    </>
                ),
            },
            {
                path: 'sign-in/*',
                element: <SignInPage />,
            },
            {
                path: 'sign-up/*',
                element: <SignInPage />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ]
    }
];
