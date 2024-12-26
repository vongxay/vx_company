import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminLogin from './AdminLogin';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AdminLogin', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
  };

  it('แสดงฟอร์มล็อกอินได้ถูกต้อง', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('แสดงข้อความ error เมื่อล็อกอินด้วยข้อมูลไม่ถูกต้อง', async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    expect(await screen.findByText('Email or password is incorrect')).toBeInTheDocument();
  });

  it('นำทางไปยัง dashboard เมื่อล็อกอินสำเร็จ', async () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'admin999@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '@999999' } });
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
}); 