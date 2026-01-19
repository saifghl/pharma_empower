import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import { initialUsers } from './usersData';
import Modal from './Modal';

const UserManagement = () => {
    // Initialize with data from localStorage or dummy
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('adminUsers');
        return saved ? JSON.parse(saved) : initialUsers;
    });

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'confirm',
        title: '',
        message: '',
        onConfirm: null
    });

    useEffect(() => {
        localStorage.setItem('adminUsers', JSON.stringify(users));
    }, [users]);

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
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

    const handleRoleChange = (userId, newRole) => {
        showModal(
            'confirm',
            'Update Role?',
            `Are you sure you want to change this user's role to ${newRole}?`,
            () => {
                setUsers(users.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                ));
                closeModal();
                setTimeout(() => showModal('success', 'Success', 'User role updated successfully.'), 300);
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
            <div className="users-table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.full_name || user.name}</td>
                                <td>{user.email}</td>
                                <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="role-select"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
