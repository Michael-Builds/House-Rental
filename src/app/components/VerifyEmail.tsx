"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("Verifying...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus("No verification token found. Please check your email link.");
      setIsLoading(false);
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setStatus("Email verified successfully!");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setStatus(data.error || "Verification failed. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualRedirect = () => {
    router.push("/");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      <h1 style={{ color: "#333" }}>Email Verification</h1>

      {isLoading ? (
        <p style={{ color: "#666", fontSize: "18px" }}>
          Verifying your email...
        </p>
      ) : (
        <>
          <p style={{ color: "#666", fontSize: "18px" }}>{status}</p>

          {status === "Email verified successfully!" && (
            <div>
              <p style={{ color: "#4CAF50", fontSize: "16px" }}>
                Your email has been verified. You can now log in to your
                account.
              </p>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Redirecting to home page...
              </p>
              <button
                onClick={handleManualRedirect}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Go to Home Page
              </button>
            </div>
          )}

          {status === "Verification failed. Please try again." && (
            <p style={{ color: "#f44336", fontSize: "16px" }}>
              Please check your verification link and try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
