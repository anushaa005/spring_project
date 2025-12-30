import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/jobs')
            .then(res => setJobs(res.data.data))
            .catch(err => {
                console.error("Error fetching jobs:", err);
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading jobs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-xl text-red-600 mb-4">{error}</div>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Available Opportunities</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center text-gray-600 mt-10">
                    No jobs available at the moment.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map(job => (
                        <div key={job.id} className="p-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition">
                            <h2 className="text-xl font-bold text-blue-700">{job.title}</h2>
                            <p className="text-gray-500 font-medium">{job.companyName}</p>
                            <p className="text-gray-600 mt-1 italic">{job.location}</p>
                            <p className="text-gray-700 mt-3 text-sm line-clamp-3">{job.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-green-600 font-bold">{job.salary}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded uppercase">{job.jobType}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}