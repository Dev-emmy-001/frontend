import api from '../data/apiConfig';

/**
 * Permanent Administrator Credentials constant check
 */
export const PERMANENT_ADMIN_EMAIL = 'emmanuelsaka333@gmail.com';

/**
 * Check if the provided credentials match the permanent administrator
 */
export const isPermanentAdminCredentials = (email, password) => {
  return (
    email?.trim().toLowerCase() === PERMANENT_ADMIN_EMAIL &&
    password === 'Timilehin@1'
  );
};

/**
 * Helper to get the current logged-in user from localStorage
 */
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Switches the current logged-in user role between 'buyer' and 'private_seller'
 * Sends update to backend if available, synchronizes localStorage, and triggers UI updates.
 *
 * @param {'buyer' | 'private_seller'} targetRole - The new role to switch into
 * @returns {Promise<Object>} Updated user object
 */
export const switchUserRole = async (targetRole) => {
  const currentUser = getCurrentUser() || {};

  try {
    // Attempt backend role update via /auth/update-role or /users/update-role
    let res;
    try {
      res = await api.put('/auth/update-role', { role: targetRole });
    } catch (e) {
      res = await api.put('/users/update-role', { role: targetRole });
    }

    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
    }
    const updatedUser = res?.data?.user || { ...currentUser, role: targetRole };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Notify listeners across all open tabs and components
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('user_role_changed', { detail: updatedUser }));
    return updatedUser;
  } catch (err) {
    console.warn('Backend update failed, updating local state:', err.message);
    const updatedUser = { ...currentUser, role: targetRole };
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Notify listeners
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('user_role_changed', { detail: updatedUser }));
    return updatedUser;
  }
};
