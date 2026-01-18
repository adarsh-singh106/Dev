import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/lib/schemas";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AuthForms = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  // Login Form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLogin,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Signup Form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    reset: resetSignup,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onLogin = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success("Logged in successfully");
      onSuccess?.();
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      toast.success("Account created! check email for verification.");
      // onSuccess?.(); // Maybe don't close modal immediately if verification is needed, but Supabase default is confusing.
      // If email confirm is off, it auto logs in. If on, it doesn't.
      // Assuming auto-login or "Check email" message.
    } catch (error) {
      toast.error(error.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Redirects away, so no need for onSuccess
    } catch (error) {
      toast.error(error.message || "Failed to initiate Google login");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetLogin();
    resetSignup();
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Google Login - Always visible or top */}
      <Button
        variant="outline"
        type="button"
        onClick={onGoogleLogin}
        className="w-full"
      >
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {isLogin ? (
        <form
          onSubmit={handleSubmitLogin(onLogin)}
          className="flex flex-col gap-3"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...registerLogin("email")}
            />
            {errorsLogin.email && (
              <p className="text-sm text-red-500">
                {errorsLogin.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...registerLogin("password")}
            />
            {errorsLogin.password && (
              <p className="text-sm text-red-500">
                {errorsLogin.password.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitSignup(onSignup)}
          className="flex flex-col gap-3"
        >
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...registerSignup("fullName")}
            />
            {errorsSignup.fullName && (
              <p className="text-sm text-red-500">
                {errorsSignup.fullName.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...registerSignup("email")}
            />
            {errorsSignup.email && (
              <p className="text-sm text-red-500">
                {errorsSignup.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...registerSignup("password")}
            />
            {errorsSignup.password && (
              <p className="text-sm text-red-500">
                {errorsSignup.password.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Sign Up"}
          </Button>
        </form>
      )}

      <div className="text-center text-sm">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={toggleMode}
          className="underline font-medium offset-4 hover:text-primary"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthForms;
