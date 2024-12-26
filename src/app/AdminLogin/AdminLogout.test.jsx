import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AdminLogout from './AdminLogout';
import { vi } from 'vitest';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

describe('AdminLogout', () => {
  beforeEach(() => {
    // Setup localStorage mock
    vi.stubGlobal('localStorage', {
      removeItem: vi.fn()
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('removes isAdminLoggedIn from localStorage', () => {
    render(<AdminLogout />);
    expect(localStorage.removeItem).toHaveBeenCalledWith('isAdminLoggedIn');
  });

  test('navigates to admin-login page', () => {
    render(<AdminLogout />);
    expect(mockNavigate).toHaveBeenCalledWith('/admin-login');
  });

  test('displays loading message', () => {
    render(<AdminLogout />);
    expect(screen.getByText('กำลังออกจากระบบ...')).toBeInTheDocument();
  });

  test('renders spinner icon', () => {
    const { container } = render(<AdminLogout />);
    expect(container.getElementsByClassName('fa-spinner')[0]).toBeInTheDocument();
  });
});