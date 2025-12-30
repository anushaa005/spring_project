// Create this as: frontend/src/pages/TestAPI.jsx
// Then temporarily change App.jsx to show this component

import React, { useState } from 'react';
import axios from 'axios';

export default function TestAPI() {
    const [result, setResult] = useState('');
    const [token, setToken] = useState('');

    // Test 1: Direct axios call (no interceptor)
    const testDirect = async () => {
        try {
            const response = await axios.get('http://localhost:8880/api/jobs');
            setResult('✅ SUCCESS (No Auth): ' + JSON.stringify(response.data, null, 2));
        } catch (err) {
            setResult('❌ FAILED (No Auth): ' + err.message + '\n' + JSON.stringify(err.response?.data, null, 2));
        }
    };

    // Test 2: With Bearer token
    const testWithToken = async () => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        if (!storedToken) {
            setResult('❌ No token found in localStorage!');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8880/api/jobs', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });
            setResult('✅ SUCCESS (With Auth): ' + JSON.stringify(response.data, null, 2));
        } catch (err) {
            setResult('❌ FAILED (With Auth): ' + err.message + '\n' +
                'Status: ' + err.response?.status + '\n' +
                JSON.stringify(err.response?.data, null, 2));
        }
    };

    // Test 3: Using your api instance
    const testApiInstance = async () => {
        try {
            const api = (await import('../api/axios')).default;
            const response = await api.get('/jobs');
            setResult('✅ SUCCESS (API Instance): ' + JSON.stringify(response.data, null, 2));
        } catch (err) {
            setResult('❌ FAILED (API Instance): ' + err.message + '\n' +
                'Status: ' + err.response?.status + '\n' +
                JSON.stringify(err.response?.data, null, 2));
        }
    };

    // Test 4: Check localStorage
    const checkStorage = () => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken || 'No token found');
        setResult(`Token in localStorage: ${storedToken ? '✅ EXISTS' : '❌ MISSING'}\n\nToken: ${storedToken}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">API Test Page</h1>

                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4">Quick Tests</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={checkStorage}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            1. Check Token in Storage
                        </button>
                        <button
                            onClick={testDirect}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            2. Test Without Auth
                        </button>
                        <button
                            onClick={testWithToken}
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            3. Test With Token
                        </button>
                        <button
                            onClick={testApiInstance}
                            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                        >
                            4. Test API Instance
                        </button>
                    </div>
                </div>

                {token && (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                        <h3 className="font-bold mb-2">Current Token:</h3>
                        <p className="text-xs break-all font-mono">{token}</p>
                    </div>
                )}

                {result && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-300">
                        <h3 className="font-bold mb-3">Result:</h3>
                        <pre className="text-sm overflow-auto whitespace-pre-wrap">{result}</pre>
                    </div>
                )}

                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold mb-2">Instructions:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>First, click "Check Token in Storage" - does it show a token?</li>
                        <li>If no token, go back and login first</li>
                        <li>Try each test button and see which ones succeed</li>
                        <li>This will tell us exactly where the problem is</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}