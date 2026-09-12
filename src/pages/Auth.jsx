```jsx
import React, { useState, useEffect } from "react";

export default function AuthenticationPage() {
  // Layout & theme
  const [darkMode, setDarkMode] = useState(false);

  // Flow state
  const [screen, setScreen] = useState("guest"); // guest | signup | verify | otp | login | authenticated
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Form state
  const [signup, setSignup] = useState({ name: "", email: "", password: "", confirm: "" });
  const [login, setLogin] = useState({ email: "", password: "" });
  const [verificationCode, setVerificationCode] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // UX state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Simulated backend constants (for demonstration)
  const SIM_VERIFICATION_CODE = "123456";
  const SIM_OTP_CODE = "654321";

  // Helpers
  const primaryColor = "#00695C"; // Deep teal
  const amberColor = "#FFB300"; // Amber for accents

  // Reset messages on screen change
  useEffect(() => {
    setMessage("");
    setError("");
  }, [screen]);

  // Theme effect (dark mode via Tailwind's dark: classes)
  useEffect(() => {
    // Apply a class to <html> for dark mode if possible (best-effort in this isolated component)
    if (typeof document !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  // Actions
  const handleGuestContinue = () => {
    setAuthenticatedUser({ name: "Guest", method: "Guest" });
    setScreen("authenticated");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = signup;
    if (!name || !email || !password || !confirm) {
      setError("Please complete all signup fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Simulate sending verification email
setMessage(`Verification code sent to ${email}. (simulation)`);
setScreen("verify");
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (verificationCode.trim() === "") {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    if (verificationCode === SIM_VERIFICATION_CODE) {
      setMessage("Email verified. Proceed to OTP for final activation.");
      setScreen("otp");
    } else {
      setError("Incorrect verification code. Please try again.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode.trim() === "") {
      setError("Enter the 6-digit OTP.");
      return;
    }
    if (otpCode === SIM_OTP_CODE) {
      // Successful
