import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    // User form state
    const [userForm, setUserForm] = useState({
        username: '',
        emailid: '',
        phoneno: '',
        DOB: '',
        roleid: '',
        password: ''
    });

    // Employee form state
    const [employeeForm, setEmployeeForm] = useState({
        FName: '',
        LName: '',
        Deptid: '',
        Desigid: '',
        Address: '',
        doj: '',
        stateid: '',
        countryid: '',
        regionid: '',
        userid: ''
    });

    // Fetch data
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.message.includes('CORS')) {
                alert('CORS Error: The backend server is not allowing requests from this origin. Please check if the backend CORS configuration includes your frontend origin.');
            } else {
                alert('Error fetching users: ' + (error.response?.data?.error || error.message));
            }
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            if (error.message.includes('CORS')) {
                alert('CORS Error: The backend server is not allowing requests from this origin. Please check if the backend CORS configuration includes your frontend origin.');
            } else {
                alert('Error fetching employees: ' + (error.response?.data?.error || error.message));
            }
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchEmployees();
    }, []);

    // Handle form changes
    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEmployeeFormChange = (e) => {
        const { name, value } = e.target;
        setEmployeeForm(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'user') {
                // Format the data to match backend expectations
                console.log(userForm)
                const userData = {
                    username: userForm.username,
                    emailid: userForm.emailid,
                    phoneno: userForm.phoneno,
                    DOB: new Date(userForm.DOB).toISOString().split('T')[0],
                    roleid: parseInt(userForm.roleid),
                    password: userForm.password
                };
                
                console.log('Submitting user data:', userData);
                
                if (editingItem) {
                    await axios.put(`http://localhost:3000/users/${editingItem.userid}`, userData);
                } else {
                    const response = await axios.post('http://localhost:3000/users', userData);
                    console.log('User created:', response.data);
                }
                fetchUsers();
            } else {
                // Format the employee data to match backend expectations
                const employeeData = {
                    FName: employeeForm.FName,
                    LName: employeeForm.LName,
                    Deptid: parseInt(employeeForm.Deptid),
                    Desigid: parseInt(employeeForm.Desigid),
                    Address: employeeForm.Address,
                    doj: new Date(employeeForm.doj).toISOString().split('T')[0],
                    stateid: employeeForm.stateid ? parseInt(employeeForm.stateid) : null,
                    countryid: parseInt(employeeForm.countryid),
                    regionid: parseInt(employeeForm.regionid),
                    userid: employeeForm.userid || 'default_user' // Provide a default value if not set
                };
                
                console.log('Submitting employee data:', employeeData);
                
                if (editingItem) {
                    await axios.put(`http://localhost:3000/employees/${editingItem.Empid}`, employeeData);
                } else {
                    const response = await axios.post('http://localhost:3000/employees', employeeData);
                    console.log('Employee created:', response.data);
                }
                fetchEmployees();
            }
            handleClose();
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            let errorMessage = 'An error occurred while submitting the data.';
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage = error.response.data.error || error.response.data.message || errorMessage;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response from server. Please check if the server is running.';
            }
            
            alert('Error: ' + errorMessage);
        }
    };

    // Handle delete
    const handleDelete = async (type, id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                if (type === 'user') {
                    await axios.delete(`http://localhost:3000/users/${id}`);
                    fetchUsers();
                } else {
                    await axios.delete(`http://localhost:3000/employees/${id}`);
                    fetchEmployees();
                }
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    };

    // Handle edit
    const handleEdit = (type, item) => {
        setFormType(type);
        setEditingItem(item);
        if (type === 'user') {
            setUserForm({
                username: item.username,
                emailid: item.emailid,
                phoneno: item.phoneno,
                DOB: item.DOB,
                roleid: item.roleid,
                password: item.password
            });
        } else {
            setEmployeeForm({
                FName: item.FName,
                LName: item.LName,
                Deptid: item.Deptid,
                Desigid: item.Desigid,
                Address: item.Address,
                doj: item.doj,
                stateid: item.stateid,
                countryid: item.countryid,
                regionid: item.regionid,
                userid: item.userid
            });
        }
        setShowForm(true);
    };

    // Handle add new
    const handleAddNew = (type) => {
        console.log('Adding new:', type);
        setFormType(type);
        setEditingItem(null);
        if (type === 'user') {
            setUserForm({
                username: '',
                emailid: '',
                phoneno: '',
                DOB: '',
                roleid: '',
                password: ''
            });
        } else {
            setEmployeeForm({
                FName: '',
                LName: '',
                Deptid: '',
                Desigid: '',
                Address: '',
                doj: '',
                stateid: '',
                countryid: '',
                regionid: '',
                userid: ''
            });
        }
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    return (
        <div className="admin-panel">
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
                    onClick={() => setActiveTab('employees')}
                >
                    Employees
                </button>
            </div>

            {activeTab === 'users' && (
                <div className="content-section">
                    <button className="add-button" onClick={() => handleAddNew('user')}>
                        Add New User
                    </button>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userid}>
                                    <td>{user.username}</td>
                                    <td>{user.emailid}</td>
                                    <td>{user.phoneno}</td>
                                    <td>{new Date(user.DOB).toLocaleDateString()}</td>
                                    <td>{user.roleid}</td>
                                    <td>
                                        <button onClick={() => handleEdit('user', user)}>Edit</button>
                                        <button onClick={() => handleDelete('user', user.userid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'employees' && (
                <div className="content-section">
                    <button className="add-button" onClick={() => handleAddNew('employee')}>
                        Add New Employee
                    </button>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Address</th>
                                <th>Join Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.Empid}>
                                    <td>{employee.FName}</td>
                                    <td>{employee.LName}</td>
                                    <td>{employee.Deptid}</td>
                                    <td>{employee.Desigid}</td>
                                    <td>{employee.Address}</td>
                                    <td>{new Date(employee.doj).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit('employee', employee)}>Edit</button>
                                        <button onClick={() => handleDelete('employee', employee.Empid)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editingItem ? `Edit ${formType === 'user' ? 'User' : 'Employee'}` : `Add New ${formType === 'user' ? 'User' : 'Employee'}`}</h2>
                        <form onSubmit={handleSubmit}>
                            {formType === 'user' ? (
                                <>
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={userForm.username}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            name="emailid"
                                            value={userForm.emailid}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input
                                            type="text"
                                            name="phoneno"
                                            value={userForm.phoneno}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth:</label>
                                        <input
                                            type="date"
                                            name="DOB"
                                            value={userForm.DOB}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role ID:</label>
                                        <input
                                            type="number"
                                            name="roleid"
                                            value={userForm.roleid}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            name="Password"
                                            value={userForm.password}
                                            onChange={handleUserFormChange}
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input
                                            type="text"
                                            name="FName"
                                            value={employeeForm.FName}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input
                                            type="text"
                                            name="LName"
                                            value={employeeForm.LName}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Department ID:</label>
                                        <input
                                            type="number"
                                            name="Deptid"
                                            value={employeeForm.Deptid}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Designation ID:</label>
                                        <input
                                            type="number"
                                            name="Desigid"
                                            value={employeeForm.Desigid}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <input
                                            type="text"
                                            name="Address"
                                            value={employeeForm.Address}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Joining:</label>
                                        <input
                                            type="date"
                                            name="doj"
                                            value={employeeForm.doj}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>State ID:</label>
                                        <input
                                            type="number"
                                            name="stateid"
                                            value={employeeForm.stateid}
                                            onChange={handleEmployeeFormChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Country ID:</label>
                                        <input
                                            type="number"
                                            name="countryid"
                                            value={employeeForm.countryid}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Region ID:</label>
                                        <input
                                            type="number"
                                            name="regionid"
                                            value={employeeForm.regionid}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>User ID:</label>
                                        <input
                                            type="text"
                                            name="userid"
                                            value={employeeForm.userid}
                                            onChange={handleEmployeeFormChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <div className="form-actions">
                                <button type="button" onClick={handleClose}>Cancel</button>
                                <button type="submit">{editingItem ? 'Update' : 'Add'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel; 