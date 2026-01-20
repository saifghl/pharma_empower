import React, { useEffect, useState } from 'react';
import './UserManagement.css';
import Modal from './Modal';
import { userAPI } from '../../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: '',
    onConfirm: null
  });

  /* ================= LOAD USERS ================= */
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userAPI.getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users', err);
    }
  };

  /* ================= MODAL HELPERS ================= */
  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const showModal = (type, title, message, onConfirm = null) => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
      onConfirm
    });
  };

  /* ================= ROLE UPDATE ================= */
  const handleRoleChange = (userId, newRole) => {
    showModal(
      'confirm',
      'Update Role?',
      `Change role to ${newRole}?`,
      async () => {
        try {
          await userAPI.updateUserRole(userId, newRole);
          fetchUsers();
          closeModal();
          setTimeout(() => {
            showModal('success', 'Success', 'Role updated successfully');
          }, 300);
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const handleBlockToggle = (userId, isBlocked) => {
    const newStatus = isBlocked ? 0 : 1;

    showModal(
      'confirm',
      `${newStatus ? 'Block' : 'Unblock'} User?`,
      `Are you sure you want to ${newStatus ? 'block' : 'unblock'} this user?`,
      async () => {
        try {
          await userAPI.updateUserStatus(userId, newStatus);
          fetchUsers();
          closeModal();
          setTimeout(() => {
            showModal(
              'success',
              'Success',
              `User ${newStatus ? 'blocked' : 'unblocked'} successfully`
            );
          }, 300);
        } catch (err) {
          console.error(err);
        }
      }
    );
  };

  return (
    <div className="user-management-container">
      <Modal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onCancel={closeModal}
      />

      <h2>User Access Control</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.full_name}</td>
                <td>{user.email}</td>

                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>

                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                    disabled={user.is_blocked === 1}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      user.is_blocked ? 'blocked' : 'active'
                    }`}
                  >
                    {user.is_blocked ? 'Blocked' : 'Active'}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleBlockToggle(user.id, user.is_blocked)
                    }
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: user.is_blocked
                        ? '#38a169'
                        : '#e53e3e',
                      color: '#fff'
                    }}
                  >
                    {user.is_blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
