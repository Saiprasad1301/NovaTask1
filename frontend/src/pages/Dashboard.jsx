import { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data);
        } catch (err) {
            setError('Failed to fetch tasks');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            setMessage('Task created successfully');
            fetchTasks();
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setMessage('Task deleted successfully');
            fetchTasks();
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <header>
                <div className="user-info">
                    <h1 style={{ color: 'var(--primary)', marginBottom: '0.25rem' }}>NovaTasks</h1>
                    <h2>Welcome, {user?.name}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Role: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{user?.role}</span></p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <div className="dashboard-layout">
                <section className="task-form">
                    <h2>Create New Task</h2>
                    {error && <div className="error">{error}</div>}
                    {message && <div className="success">{message}</div>}
                    <form onSubmit={handleCreateTask}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <textarea
                                placeholder="What needs to be done?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows="4"
                            ></textarea>
                        </div>
                        <button type="submit">Add Task</button>
                    </form>
                </section>

                <section className="task-list">
                    <h2>Recent Tasks</h2>
                    {tasks.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No tasks found. Start by creating one!</p>
                    ) : (
                        tasks.map((task) => (
                            <div className="task-card" key={task.id}>
                                <div className="task-info">
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <span className="status-badge">{task.status}</span>
                                    {user?.role === 'admin' && task.User && (
                                        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                                            By: {task.User.name}
                                        </p>
                                    )}
                                </div>
                                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)} title="Delete Task">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
