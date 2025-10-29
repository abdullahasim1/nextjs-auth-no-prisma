"use client";

import Link from "next/link";
import { loginWithRedirect } from "@/app/actions/authActions";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float particle"
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
            
            {/* Header */}
            <div className="relative z-10 text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-white/70">Sign in to your account to continue</p>
            </div>

            {/* Form */}
            <form action={loginWithRedirect} className="relative z-10 space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className="block text-white/90 font-medium mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
            <input
              type="email"
              name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              required
            />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-white/90 font-medium mb-2 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
            <input
              type="password"
              name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              required
            />
                </div>
              </div>

              {/* Submit Button */}
              <button
            type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent"
          >
                Sign In
              </button>
        </form>

            {/* Footer */}
            <div className="relative z-10 text-center mt-8">
                  <p className="text-white/70 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
            href="/signup"
                      className="text-purple-300 font-medium hover:text-white transition-colors duration-300"
          >
            Sign up here
                    </Link>
                  </p>
            </div>
          </div>


        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; animation-duration: 3s; }
        .particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 0.5s; animation-duration: 4s; }
        .particle:nth-child(3) { left: 30%; top: 40%; animation-delay: 1s; animation-duration: 5s; }
        .particle:nth-child(4) { left: 40%; top: 60%; animation-delay: 1.5s; animation-duration: 3.5s; }
        .particle:nth-child(5) { left: 50%; top: 30%; animation-delay: 2s; animation-duration: 4.5s; }
        .particle:nth-child(6) { left: 60%; top: 70%; animation-delay: 2.5s; animation-duration: 3.8s; }
        .particle:nth-child(7) { left: 70%; top: 10%; animation-delay: 3s; animation-duration: 4.2s; }
        .particle:nth-child(8) { left: 80%; top: 50%; animation-delay: 0.8s; animation-duration: 3.2s; }
        .particle:nth-child(9) { left: 90%; top: 25%; animation-delay: 1.2s; animation-duration: 4.8s; }
        .particle:nth-child(10) { left: 15%; top: 75%; animation-delay: 2.2s; animation-duration: 3.6s; }
        .particle:nth-child(11) { left: 25%; top: 45%; animation-delay: 0.3s; animation-duration: 4.1s; }
        .particle:nth-child(12) { left: 35%; top: 85%; animation-delay: 1.8s; animation-duration: 3.9s; }
        .particle:nth-child(13) { left: 45%; top: 15%; animation-delay: 2.8s; animation-duration: 4.3s; }
        .particle:nth-child(14) { left: 55%; top: 55%; animation-delay: 0.7s; animation-duration: 3.7s; }
        .particle:nth-child(15) { left: 65%; top: 35%; animation-delay: 1.5s; animation-duration: 4.4s; }
        .particle:nth-child(16) { left: 75%; top: 65%; animation-delay: 2.3s; animation-duration: 3.4s; }
        .particle:nth-child(17) { left: 85%; top: 5%; animation-delay: 0.9s; animation-duration: 4.6s; }
        .particle:nth-child(18) { left: 5%; top: 95%; animation-delay: 1.7s; animation-duration: 3.3s; }
        .particle:nth-child(19) { left: 95%; top: 40%; animation-delay: 2.7s; animation-duration: 4.7s; }
        .particle:nth-child(20) { left: 12%; top: 8%; animation-delay: 1.1s; animation-duration: 3.1s; }
      `}</style>
    </div>
  );
}
