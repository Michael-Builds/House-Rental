
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function VerifyEmail() {
    const router = useRouter();
    const { token } = router.query;
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        if (token) {
            verifyEmail();
        }
    }, [token]);

    const verifyEmail = async () => {
        try {
            const response = await fetch(`/api/verify-email?token=${token}`);
            if (response.ok) {
                setStatus('Email verified successfully!');
                setTimeout(() => router.push('/login'), 3000); // Redirect to login page after 3 seconds
            } else {
                setStatus('Verification failed. Please try again.');
            }
        } catch (error) {
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '50px' }}>
            <h1 style={{ color: '#333' }}>Email Verification</h1>
            <p style={{ color: '#666', fontSize: '18px' }}>{status}</p>
            {status === 'Email verified successfully!' && (
                <div>
                    <p style={{ color: '#4CAF50', fontSize: '16px' }}>Your email has been verified. You can now log in to your account.</p>
                    <p style={{ color: '#666', fontSize: '14px' }}>Redirecting to login page...</p>
                </div>
            )}
            {status === 'Verification failed. Please try again.' && (
                <p style={{ color: '#f44336', fontSize: '16px' }}>Please check your verification link and try again.</p>
            )}
        </div>
    );
}