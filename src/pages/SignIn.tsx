import { SignIn } from '@clerk/clerk-react';

export const SignInPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md">
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary hover:bg-orange-600 text-sm normal-case',
                            card: 'shadow-xl border border-slate-100 rounded-3xl',
                            headerTitle: 'text-2xl font-bold text-secondary',
                            headerSubtitle: 'text-slate-500',
                        }
                    }}
                />
            </div>
        </div>
    );
};
