'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AdminLoginProps {
  onClose?: () => void;
}

export default function AdminLogin({ onClose }: AdminLoginProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dedicated login page
    router.push('/admin/login');
    onClose?.();
  }, [router, onClose]);

  return null; // Component now redirects to dedicated login page
}