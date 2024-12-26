import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '../style/Dashboard.css';
import ReactGA from 'react-ga4';
import DashNavbar from '../app/DashNavbar/DashNavbar';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getMockAnalyticsData } from '../mocks/analyticsData';
import Papa from 'papaparse';
import { getAnalyticsData } from '../lib/analytics';
import { checkSupabaseConnection } from '../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [stats, setStats] = useState({
        totalContacts: 0,
        totalProjects: 0,
        totalServices: 6,
        totalBlogs: 3,
        activeUsers: 0,
        pageViews: 0,
        avgSessionDuration: 0,
        bounceRate: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [replyData, setReplyData] = useState({
        to: '',
        subject: '',
        message: ''
    });
    const [analyticsData, setAnalyticsData] = useState({
        dailyVisitors: [],
        dailyPageViews: [],
        trafficSources: {},
        dates: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [error, setError] = useState(null);

    useEffect(() => {
        ReactGA.initialize('G-3ZQ8DXE1MK');
    }, []);

    useEffect(() => {
        const initializeDashboard = async () => {
            setLoading(true);
            try {
                const isConnected = await checkSupabaseConnection();
                if (!isConnected) {
                    throw new Error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้');
                }

                await Promise.all([
                    fetchAnalyticsData(),
                    fetchPageViews(),
                    fetchContacts(),
                    fetchBlogStats()
                ]);

            } catch (error) {
                console.error('Dashboard initialization error:', error);
                setError('ไม่สามารถโหลดข้อมูลได้: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        initializeDashboard();
    }, []);

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.message.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterStatus === 'all') return matchesSearch;
        if (filterStatus === 'unread') return matchesSearch && contact.status === 'pending';
        if (filterStatus === 'read') return matchesSearch && contact.status === 'read';
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

    useEffect(() => {
        console.log('Contacts:', contacts);
        console.log('Filtered Contacts:', filteredContacts);
        console.log('Total Pages:', totalPages);
    }, [contacts, filteredContacts, totalPages]);

    const fetchAnalyticsData = async () => {
        try {
            const analyticsData = await getAnalyticsData();
            
            setAnalyticsData({
                dailyVisitors: analyticsData.activeUsers || [],
                dailyPageViews: analyticsData.pageViews || [],
                dates: analyticsData.dates || [],
                trafficSources: analyticsData.sources || {}
            });
        } catch (error) {
            console.error('Analytics data fetch error:', error);
            const mockData = getMockAnalyticsData();
            setAnalyticsData({
                dailyVisitors: mockData.visitors,
                dailyPageViews: mockData.pageViews,
                dates: mockData.dates,
                trafficSources: mockData.sources
            });
        }
    };

    const updateMessageStatus = async (contactId, newStatus) => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ status: newStatus })
                .eq('id', contactId);

            if (error) throw error;

            setContacts(contacts.map(contacts =>
                contacts.id === contactId
                    ? { ...contacts, status: newStatus }
                    : contacts
            ));
        } catch (error) {
            console.error('Error updating message status:', error);
            alert('cannot update message status');
        }
    };

    const deleteContact = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const { error } = await supabase
                    .from('contacts')
                    .delete()
                    .eq('id', contactId);

                if (error) throw error;

                setContacts(contacts.filter(contact => contact.id !== contactId));
                setStats(prev => ({
                    ...prev,
                    totalContacts: prev.totalContacts - 1
                }));
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('cannot delete message');
            }
        }
    };

    const MessageModal = () => {
        if (!selectedContact) return null;

        return (
            <div className="message-modal" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h2>Message Details</h2>
                    <p><strong>Name:</strong> {selectedContact.name}</p>
                    <p><strong>Email:</strong> {selectedContact.email}</p>
                    <p><strong>Subject:</strong> {selectedContact.subject}</p>
                    <p><strong>Message:</strong> {selectedContact.message}</p>
                    <p><strong>Date:</strong> {new Date(selectedContact.created_at).toLocaleString('lo-LA')}</p>
                    <button onClick={() => {
                        updateMessageStatus(selectedContact.id, 'read');
                        setIsModalOpen(false);
                    }}>
                        Mark as Read
                    </button>
                    <button
                        className="action-btn !absolute left-[85%] top-[83%]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setReplyData({
                                to: selectedContact.email,
                                subject: `Re: ${selectedContact.subject}`,
                                message: `\n\n-----------------\nOriginal Message:\n${selectedContact.message}`
                            });
                            setIsReplyModalOpen(true);
                        }}
                    >
                        <i className="fas fa-reply !text-white"></i>
                    </button>
                </div>
            </div>
        );
    };

    const ReplyModal = () => {
        const [localReplyData, setLocalReplyData] = useState({
            to: replyData.to,
            subject: replyData.subject,
            message: replyData.message
        });

        useEffect(() => {
            setLocalReplyData(replyData);
        }, []);

        if (!isReplyModalOpen || !selectedContact) return null;

        const handleSubmit = (e) => {
            e.preventDefault();
            window.location.href = `mailto:${localReplyData.to}?subject=${encodeURIComponent(localReplyData.subject)}&body=${encodeURIComponent(localReplyData.message)}`;
            setIsReplyModalOpen(false);
        };

        return (
            <div className="message-modal" onClick={() => setIsReplyModalOpen(false)}>
                <div className="modal-content reply-modal" onClick={e => e.stopPropagation()}>
                    <h2>Reply to Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>To:</label>
                            <input
                                type="email"
                                value={localReplyData.to}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <input
                                type="text"
                                value={localReplyData.subject}
                                onChange={(e) => setLocalReplyData(prev => ({
                                    ...prev,
                                    subject: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Message:</label>
                            <textarea
                                value={localReplyData.message}
                                onChange={(e) => setLocalReplyData(prev => ({
                                    ...prev,
                                    message: e.target.value
                                }))}
                                required
                                rows="6"
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="send-btn">
                                <i className="fas fa-paper-plane"></i> Send
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsReplyModalOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const AnalyticsCharts = () => {
        if (!analyticsData.dates?.length) {
            return <div>ไม่มีข้อมูลกราฟที่จะแสดง</div>;
        }

        const visitorData = {
            labels: analyticsData.dates,
            datasets: [
                {
                    label: 'Visitors',
                    data: analyticsData.dailyVisitors,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        };

        const pageViewData = {
            labels: analyticsData.dates,
            datasets: [
                {
                    label: 'Page Views',
                    data: analyticsData.dailyPageViews,
                    backgroundColor: 'rgba(52, 211, 153, 0.8)'
                }
            ]
        };

        const sourceData = {
            labels: Object.keys(analyticsData.trafficSources),
            datasets: [
                {
                    data: Object.values(analyticsData.trafficSources),
                    backgroundColor: [
                        '#27ae60',
                        '#2ecc71',
                        '#34d399',
                        '#6ee7b7'
                    ]
                }
            ]
        };

        return (
            <div className="analytics-charts">
                <div className="chart-container">
                    <h3>Visitors Trend</h3>
                    <Line 
                        data={visitorData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }}
                    />
                </div>
                
                <div className="chart-container">
                    <h3>Daily Page Views</h3>
                    <Bar 
                        data={pageViewData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                tooltip: {
                                    mode: 'index',
                                    intersect: false,
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }}
                    />
                </div>

                <div className="chart-container">
                    <h3>Traffic Sources</h3>
                    <Doughnut 
                        data={sourceData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'right' },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const label = context.label || '';
                                            const value = context.parsed || 0;
                                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                            const percentage = ((value / total) * 100).toFixed(1);
                                            return `${label}: ${percentage}%`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    };

    const currentMessages = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const exportData = async () => {
        try {
            const { data: contacts } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            const csvData = contacts.map(contact => ({
                date: new Date(contact.created_at).toLocaleString('lo-LA'),
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message,
                status: contact.status
            }));

            const csv = Papa.unparse(csvData);
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `contacts_${new Date().toISOString()}.csv`;
            link.click();
        } catch (error) {
            console.error('Error:', error);
            setError('ไม่สามารถส่งออกข้อมูลได้');
        }
    };

    const fetchPageViews = async () => {
        try {
            const { data: viewsData } = await supabase
                .from('page_views')
                .select('created_at, page_path')
                .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

            const pageViewsByPath = viewsData?.reduce((acc, view) => {
                acc[view.page_path] = (acc[view.page_path] || 0) + 1;
                return acc;
            }, {});

            setAnalyticsData(prev => ({
                ...prev,
                pageViews: pageViewsByPath || {},
                totalViews: viewsData?.length || 0
            }));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchContacts = async () => {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            if (!data) {
                throw new Error('ไม่พบข้อมูล');
            }

            const pending = data.filter(c => c.status === 'pending').length || 0;
            const completed = data.filter(c => c.status === 'completed').length || 0;

            setStats(prev => ({
                ...prev,
                totalContacts: data.length,
                pendingContacts: pending,
                completedContacts: completed
            }));

            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError('ไม่สามารถโหลดข้อความได้: ' + error.message);
            setContacts([]);
        }
    };

    const fetchBlogStats = async () => {
        try {
            const { data: viewsData, error: viewsError } = await supabase
                .from('blog_views')
                .select('blog_id');

            if (viewsError) throw viewsError;

            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('blog_id');

            if (commentsError) throw commentsError;

            setStats(prev => ({
                ...prev,
                totalBlogViews: viewsData?.length || 0,
                totalBlogComments: commentsData?.length || 0
            }));

        } catch (error) {
            console.error('Error fetching blog stats:', error);
            setError('ไม่สามารถโหลดข้อมูลบล็อกได้');
        }
    };

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'pending':
                return 'unread';
            case 'read':
                return 'read';
            default:
                return status;
        }
    };

    return (
        <>
            <style>
                {`
                    header, footer {
                        display: none !important;
                    }
                `}
            </style>
            <DashNavbar />
            <div className="dashboard">
                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                </div>

                {/* สถิติทั่วไป */}
                <div className="stats-container">
                    {loading ? (
                        <div className="loading-state">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>กำลังโหลดข้อมูล...</p>
                        </div>
                    ) : (
                        <>
                            <div className="stat-box">
                                <div className="stat-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="stat-info">
                                    <h3>Messages</h3>
                                    <p>{stats.totalContacts}</p>
                                    <div className="stat-details">
                                        <span className="stat-detail">
                                            <i className="fas fa-envelope-open"></i>
                                            Read: {contacts.filter(c => c.status === 'read').length}
                                        </span>
                                        <span className="stat-detail">
                                            <i className="fas fa-envelope-square"></i>
                                            Unread: {contacts.filter(c => c.status === 'pending').length}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-box">
                                <div className="stat-icon">
                                    <i className="fas fa-project-diagram"></i>
                                </div>
                                <div className="stat-info">
                                    <h3>Projects</h3>
                                    <p>{stats.totalProjects}</p>
                                    <div className="stat-details">
                                        <span className="stat-detail">
                                            <i className="fas fa-clock"></i>
                                            Active: {stats.activeProjects || 0}
                                        </span>
                                        <span className="stat-detail">
                                            <i className="fas fa-check-circle"></i>
                                            Completed: {stats.completedProjects || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-box">
                                <div className="stat-icon">
                                    <i className="fas fa-cogs"></i>
                                </div>
                                <div className="stat-info">
                                    <h3>Services</h3>
                                    <p>{stats.totalServices}</p>
                                    <div className="stat-details">
                                        <span className="stat-detail">
                                            <i className="fas fa-star"></i>
                                            Popular: Web Development
                                        </span>
                                        <span className="stat-detail">
                                            <i className="fas fa-users"></i>
                                            Total Clients: {stats.totalClients || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="stat-box">
                                <div className="stat-icon">
                                    <i className="fas fa-blog"></i>
                                </div>
                                <div className="stat-info">
                                    <h3>Blogs</h3>
                                    <p>{stats.totalBlogs}</p>
                                    <div className="stat-details">
                                        <span className="stat-detail">
                                            <i className="fas fa-eye"></i>
                                            Views: {stats.totalBlogViews || 0}
                                        </span>
                                        <span className="stat-detail">
                                            <i className="fas fa-comments"></i>
                                            Comments: {stats.totalBlogComments || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* พิ่มส่วนกราฟ */}
                <AnalyticsCharts />

                {/* ส่วนค้นหาและกอง */}
                <div className="controls-section">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search Messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-box">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>

                {/* ตารางข้อความติดต่อ */}
                <div className="contacts-section">
                    <h2 className="section-title">
                        <i className="fas fa-inbox"></i>
                        Latest Messages
                    </h2>
                    {loading ? (
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <>
                            <div className="latest-messages">
                                {currentMessages.map((contact) => (
                                    <div 
                                        key={contact.id} 
                                        className={`message-card ${contact.status === 'unread' ? 'unread' : ''}`}
                                        onClick={() => {
                                            setSelectedContact(contact);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <div className="message-header">
                                            <span className={`status-dot ${getStatusDisplay(contact.status)}`} 
                                                  title={contact.status === 'pending' ? 'Unread' : 'Read'}>
                                            </span>
                                            <h3>{contact.name}</h3>
                                            <span className="message-date">
                                                {new Date(contact.created_at).toLocaleDateString('lo-LA')}
                                                {' - '}
                                                {getStatusDisplay(contact.status)}
                                            </span>
                                        </div>
                                        <div className="message-content">
                                            <p className="message-subject">{contact.subject}</p>
                                            <p className="message-preview">{contact.message.substring(0, 100)}...</p>
                                        </div>
                                        <div className="message-footer">
                                            <span className="message-email">{contact.email}</span>
                                            <div className="action-buttons-container">
                                                <button
                                                    className="action-btn view-btn"
                                                    title="View Details"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedContact(contact);
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </button>
                                                <button
                                                    className="action-btn reply-btn"
                                                    title="Reply"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedContact(contact);
                                                        setReplyData({
                                                            to: contact.email,
                                                            subject: `Re: ${contact.subject}`,
                                                            message: `\n\n-----------------\nข้อความเดิม:\n${contact.message}`
                                                        });
                                                        setIsReplyModalOpen(true);
                                                    }}
                                                >
                                                    <i className="fas fa-reply"></i>
                                                </button>
                                                <button
                                                    className="action-btn delete-btn"
                                                    title="Delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteContact(contact.id);
                                                    }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* แทนที่ปุ่มดูทั้งหมดด้วยการแบ่งหน้า */}
                            <div className="pagination-container">
                                <button 
                                    className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <i className="fas fa-chevron-left"></i> Previous
                                </button>
                                
                                {currentPage > 2 && (
                                    <button 
                                        className="page-number"
                                        onClick={() => setCurrentPage(1)}
                                    >
                                        1
                                    </button>
                                )}
                                
                                {currentPage > 3 && <span className="pagination-dots">...</span>}
                                
                                {currentPage > 1 && (
                                    <button 
                                        className="page-number"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        {currentPage - 1}
                                    </button>
                                )}
                                
                                <button className="page-number active">
                                    {currentPage}
                                </button>
                                
                                {currentPage < totalPages && (
                                    <button 
                                        className="page-number"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        {currentPage + 1}
                                    </button>
                                )}
                                
                                {currentPage < totalPages - 2 && <span className="pagination-dots">...</span>}
                                
                                {currentPage < totalPages - 1 && (
                                    <button 
                                        className="page-number"
                                        onClick={() => setCurrentPage(totalPages)}
                                    >
                                        {totalPages}
                                    </button>
                                )}
                                
                                <button 
                                    className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {isModalOpen && <MessageModal />}
                {isReplyModalOpen && <ReplyModal />}

                <button onClick={exportData} className="export-btn">
                    <i className="fas fa-download"></i>
                    Export Data
                </button>
            </div>
        </>
    );
};

export default Dashboard; 