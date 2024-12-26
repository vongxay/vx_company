import '../style/BlogDetail-2.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"

const BlogDetail2 = () => {
    const [roiInputs, setRoiInputs] = useState({
        hoursPerDay: 8,
        ratePerHour: 300,
        timeSaved: 30
    });
    
    const [comment, setComment] = useState({
        name: '',
        email: '',
        content: ''
    });

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // คำนวณ ROI
    const calculateROI = useMemo(() => {
        // ตรวจสอบว่าค่าที่รับเข้ามาถูกต้องหรือไม่
        const hours = parseFloat(roiInputs.hoursPerDay) || 0;
        const rate = parseFloat(roiInputs.ratePerHour) || 0;
        const saved = parseFloat(roiInputs.timeSaved) || 0;

        // คำนวณ
        const dailySavings = (hours * rate) * (saved / 100);
        const monthlySavings = dailySavings * 22; // ประมาณ 22 วันทำงานต่อเดือน
        const yearlySavings = monthlySavings * 12;
        
        return {
            daily: Math.round(dailySavings),
            monthly: Math.round(monthlySavings),
            yearly: Math.round(yearlySavings)
        };
    }, [roiInputs.hoursPerDay, roiInputs.ratePerHour, roiInputs.timeSaved]);

    // เพิ่มฟังก์ชันตรวจสอบอีเมล
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // ปรับปรุงฟังก์ชัน handleSubmitComment
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            
            if (!comment.name || !comment.email || !comment.content) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }

            if (!isValidEmail(comment.email)) {
                alert('กรุณากรอกอีเมลให้ถูกต้อง');
                return;
            }

            // ตรวจสอบการ spam
            const lastCommentTime = localStorage.getItem('lastCommentTime');
            if (lastCommentTime && Date.now() - parseInt(lastCommentTime) < 60000) { // 1 นาที
                alert('กรุณารอสักครู่ก่อนส่งความคิดเห็นใหม่');
                return;
            }

            const { error } = await supabase
                .from('comments')
                .insert([{
                    blog_id: 2,
                    name: comment.name,
                    email: comment.email,
                    content: comment.content,
                    created_at: new Date()
                }]);

            if (error) throw error;

            localStorage.setItem('lastCommentTime', Date.now().toString());
            setComment({ name: '', email: '', content: '' });
            await fetchComments();
            alert('ส่งความคิดเห็นเรียบร้อยแล้ว');
            
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('เกิดข้อผิดพลาด: ' + (error.message || 'กรุณาลองใหม่อีกครั้ง'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // แสดงผลการคำนวณ ROI
    const [roiResults, setRoiResults] = useState(null);

    // ดึงข้อมูลความคิดเห็นจาก Supabase
    const fetchComments = useCallback(async () => {
        try {
            // ดึงข้อมูลความคิดเห็น
            const { data: commentsData, error: commentsError } = await supabase
                .from('comments')
                .select('*')
                .eq('blog_id', 2)
                .order('created_at', { ascending: false });
    
            if (commentsError) throw commentsError;
    
            // ดึงข้อมูลการตอบกลับ
            const { data: repliesData, error: repliesError } = await supabase
                .from('comment_replies')
                .select('*')
                .eq('blog_id', 2)
                .order('created_at', { ascending: true });
    
            if (repliesError) throw repliesError;
    
            // จัดกลุ่มการตอบกลับตาม comment_id
            const groupedReplies = {};
            repliesData?.forEach(reply => {
                if (!groupedReplies[reply.comment_id]) {
                    groupedReplies[reply.comment_id] = [];
                }
                groupedReplies[reply.comment_id].push(reply);
            });
    
            setReplies(groupedReplies);
            setComments(commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // แก้ไขส่วน useEffect สำหรับการดึงความคิดเห็น
    useEffect(() => {
        fetchComments();
        const interval = setInterval(() => {
            fetchComments();
        }, 30000);
        return () => clearInterval(interval);
    }, [fetchComments]);

    // แปลงเวลาเป็นภาษาไทย
    const formatDate = (date) => {
        try {
            return formatDistanceToNow(new Date(date), {
                addSuffix: true,
                locale: th
            });
        } catch {
            return '';
        }
    };

    // เพิ่ม state ใหม่
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [replies, setReplies] = useState({});
    const [likes, setLikes] = useState({});

    // เพิ่ม state ำหรับฟอร์มตอบกลับ
    const [replyForm, setReplyForm] = useState({
        name: '',
        email: '',
        content: ''
    });

    // เพิ่ม state สำหรับการจัดการไลค์ของการตอบกลับ
    const [replyLikes, setReplyLikes] = useState({});

    // เพิ่ม state สำหรับการกดไลค์ของแต่ละความคิดเห็น
    const [hasLikedComments, setHasLikedComments] = useState({});

    // เพิ่ม state สำหรับเก็บข้อมูลผู้ใช้
    const [userEmail, setUserEmail] = useState('');

    // เพิ่มฟังก์ชันสำหรับ Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin
                }
            });
            
            if (error) throw error;
            
            // email จะถูกเก็บใน session
            const email = data?.user?.email;
            if (email) {
                setUserEmail(email);
                return email;
            }
        } catch (error) {
            console.error('Google sign in error:', error);
            return null;
        }
    };

    // เพิ่มฟังก์ชันสำหรับ Microsoft Sign In
    const handleMicrosoftSignIn = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'azure',
                options: {
                    redirectTo: window.location.origin
                }
            });
            
            if (error) throw error;
            
            const email = data?.user?.email;
            if (email) {
                setUserEmail(email);
                return email;
            }
        } catch (error) {
            console.error('Microsoft sign in error:', error);
            return null;
        }
    };

    // แก้ไขฟังก์ชัน handleLike
    const handleLike = useCallback(async (commentId) => {
        try {
            let email = userEmail;

            if (!email) {
                // แสดง Modal หรือ Dialog สำหรับเลือกวิธีการ sign in
                const signInMethod = await showSignInDialog();
                
                switch (signInMethod) {
                    case 'google':
                        email = await handleGoogleSignIn();
                        break;
                    case 'microsoft':
                        email = await handleMicrosoftSignIn();
                        break;
                    case 'email':
                        // ถ้าเลือกกรอก email โดยตรง
                        email = prompt('กรุณากรอกอีเมลของคุณ:');
                        if (!email) return;
                        
                        // ตรวจสอบรูปแบบอีเมล
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                            alert('กรุณากรอกอีเมลให้ถูกต้อง');
                            return;
                        }
                        setUserEmail(email);
                        break;
                    default:
                        return; // ยกเลิก
                }
            }

            if (!email) return;

            // ตรวจสอบว่าเคยกดไลค์แล้วหรือไม่
            const { data: existingLike, error: checkError } = await supabase
                .from('comment_likes')
                .select('id')
                .eq('comment_id', commentId)
                .eq('user_email', email)
                .single();

            if (checkError && checkError.code !== 'PGRST116') {
                throw checkError;
            }

            if (existingLike) {
                alert('คุณได้กดไลค์ความคิดเห็นนี้แล้ว');
                return;
            }

            // บันทึกการกดไลค์
            const { error } = await supabase
                .from('comment_likes')
                .insert([{
                    comment_id: commentId,
                    user_email: email,
                    created_at: new Date()
                }]);

            if (error) throw error;
            
            // อัพเดทสถานะการไลค์
            setLikes(prev => ({
                ...prev,
                [commentId]: (prev[commentId] || 0) + 1
            }));
            setHasLikedComments(prev => ({
                ...prev,
                [commentId]: true
            }));

        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาด: ' + error.message);
        }
    }, [userEmail]);

    // เพิ่มฟังก์ชันแสดง Dialog สำหรับเลือกวิธี Sign In
    const showSignInDialog = () => {
        return new Promise((resolve) => {
            const dialog = document.createElement('div');
            dialog.className = 'sign-in-dialog';
            dialog.innerHTML = `
                <div class="dialog-content">
                    <h3>เลือกวิธีการยืนยันตัวตน</h3>
                    <button class="google-btn">Sign in with Google</button>
                    <button class="microsoft-btn">Sign in with Microsoft</button>
                    <button class="email-btn">ใช้อีเมลโดยตรง</button>
                    <button class="cancel-btn">ยกเลิก</button>
                </div>
            `;

            document.body.appendChild(dialog);

            // เพิ่ม Event Listeners
            dialog.querySelector('.google-btn').onclick = () => {
                document.body.removeChild(dialog);
                resolve('google');
            };
            dialog.querySelector('.microsoft-btn').onclick = () => {
                document.body.removeChild(dialog);
                resolve('microsoft');
            };
            dialog.querySelector('.email-btn').onclick = () => {
                document.body.removeChild(dialog);
                resolve('email');
            };
            dialog.querySelector('.cancel-btn').onclick = () => {
                document.body.removeChild(dialog);
                resolve('cancel');
            };
        });
    };

    // แก้ไขฟังก์ชัน handleReply
    const handleReply = async (commentId) => {
        try {
            if (!replyForm.name || !replyForm.email || !replyForm.content) {
                alert('Please fill in all the information');
                return;
            }

            const { error } = await supabase
                .from('comment_replies')
                .insert([
                    {
                        comment_id: commentId,
                        blog_id: 2, // เพิ่ม blog_id
                        name: replyForm.name,
                        email: replyForm.email,
                        content: replyForm.content,
                        created_at: new Date()
                    }
                ]);

            if (error) throw error;

            // รีเซ็ตฟอร์มและซ่อนฟอร์มตอบกลับ
            setReplyForm({ name: '', email: '', content: '' });
            setShowReplyForm(null);
            
            // ดึงความคิดเห็นและการตอบกลับใหม่
            await fetchComments();
            
            alert('ส่งการตอบกลับเรียบร้อยแล้ว');
            
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    // แก้ไขฟังก์ชัน handleReplyLike
    const handleReplyLike = useCallback(async (replyId) => {
        try {
            const likedReplies = JSON.parse(localStorage.getItem('likedReplies') || '{}');
            
            if (likedReplies[replyId]) {
                alert('คุณได้กดไลค์การตอบกลับนี้แล้ว');
                return;
            }

            const { error } = await supabase
                .from('reply_likes')
                .insert([
                    {
                        reply_id: replyId,
                        blog_id: 2,
                        created_at: new Date()
                    }
                ]);

            if (error) throw error;
            
            // อัพเดทสถานะการไลค์เป็น 1 ทันที
            setReplyLikes(prev => ({
                ...prev,
                [replyId]: 1
            }));

            likedReplies[replyId] = true;
            localStorage.setItem('likedReplies', JSON.stringify(likedReplies));

        } catch (error) {
            alert('เกิดข้อผิดพลาด: ' + error.message);
        }
    }, []);

    // เพิ่ม useEffect สำหรับดึงข้อมูลไลค์ของการตอบกลับเมื่อโหลดหน้า
    useEffect(() => {
        const fetchReplyLikes = async () => {
            try {
                const { data, error } = await supabase
                    .from('reply_likes')
                    .select('reply_id')
                    .eq('blog_id', 2);

                if (error) throw error;

                // นับจำนวนไลค์สำหรับแต่ละการตอบกลับ
                const likesCount = {};
                data.forEach(like => {
                    likesCount[like.reply_id] = (likesCount[like.reply_id] || 0) + 1;
                });

                setReplyLikes(likesCount);
            } catch (error) {
                console.error('Error fetching reply likes:', error);
            }
        };

        fetchReplyLikes();
    }, []);

    // เพิ่ม state สำหรับการโหลด
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 4;
    
    // คำนวณจำนวนหน้าทั้งหมด
    const totalTools = 8; // จำนวน tools ทั้งหมด
    const totalPages = Math.ceil(totalTools / toolsPerPage);
    
    // คำนวณ tools ที่จะแสดงในหน้าปัจจุบัน
    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    
    const [tools] = useState([
        { id: 1, name: 'ChatGPT', description: 'AI language model for text generation', advantages: 'Versatile', disadvantages: 'Can be inaccurate' },
        { id: 2, name: 'Midjourney', description: 'AI image generation', advantages: 'High quality', disadvantages: 'Expensive' },
        { id: 3, name: 'Notion AI', description: 'AI-powered workspace', advantages: 'Integrated', disadvantages: 'Learning curve' },
        { id: 4, name: 'Copy.ai', description: 'Marketing content generator', advantages: 'Fast', disadvantages: 'Limited formats' },
        { id: 5, name: 'Jasper', description: 'Content writing assistant', advantages: 'Templates', disadvantages: 'Pricey' },
        { id: 6, name: 'Stable Diffusion', description: 'Open-source image generation', advantages: 'Free', disadvantages: 'Complex setup' },
        { id: 7, name: 'GitHub Copilot', description: 'Code completion tool', advantages: 'Productive', disadvantages: 'Subscription based' },
        { id: 8, name: 'Otter.ai', description: 'AI transcription service', advantages: 'Accurate', disadvantages: 'Internet required' },
    ]);
    
    // แทนที่ส่วนปุ่ม show more ด้วย pagination

    // เพิ่ม state สำหรับ pagination ของความคิดเห็น
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const commentsPerPage = 6;

    // แก้ไขส่วนการแสดงความคิดเห็น
    const indexOfLastComment = currentCommentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalCommentPages = Math.ceil(comments.length / commentsPerPage);

    // เพิ่ม state สำหรับ pagination ของการตอบกลับ
    const [replyPages, setReplyPages] = useState({});
    const repliesPerPage = 3;

    // แก้ไขส่วนการแสดงการตอบกลับในแต่ละความคิดเห็น
    const getCurrentReplies = (commentId) => {
        const currentPage = replyPages[commentId] || 1;
        const allReplies = replies[commentId] || [];
        const indexOfLastReply = currentPage * repliesPerPage;
        const indexOfFirstReply = indexOfLastReply - repliesPerPage;
        return {
            currentReplies: allReplies.slice(indexOfFirstReply, indexOfLastReply),
            totalPages: Math.ceil(allReplies.length / repliesPerPage)
        };
    };

    // ฟังก์ชันสำหรับเปลี่ยนหน้าการตอบกลับ
    const handleReplyPageChange = (commentId, newPage) => {
        setReplyPages(prev => ({
            ...prev,
            [commentId]: newPage
        }));
    };

    return (
        <div className="blog-detail-container">
            <div className="blog-header">
                <h1>Smart AI Work: A Complete Guide</h1>
                <div className="blog-meta">
                    <span><i className="far fa-calendar"></i> 19 Nov 2024</span>
                    <span><i className="far fa-user"></i> VX Tech Team</span>
                </div>
            </div>

            <div className="blog-content">
                <img src="/images/blog-img-2.jpeg" alt="AI Working" className="featured-image" />
                
                <div className="content-section">
                    <h2>🤖 Why use AI in work?</h2>
                    <p>In the digital age, technology is advancing rapidly. AI has become a powerful tool that helps increase work efficiency, reduce time spent on repetitive tasks, and increase data accuracy in analysis.</p>
                </div>

                <div className="content-section">
                    <h2>🎯 Benefits of AI in work</h2>
                    <ul className="benefits-list">
                        <li>Increase processing speed</li>
                        <li>Reduce errors from manual work</li>
                        <li>Analyze large data accurately</li>
                        <li>Save time and resources</li>
                        <li>Create automatic reports</li>
                    </ul>
                </div>

                <div className="content-section">
                    <h2>💡 Recommended AI tools</h2>
                    <div className="tools-grid">
                        <div className="tool-card">
                            <h3>ChatGPT</h3>
                            <p>Write content, analyze data, and answer questions</p>
                        </div>
                        <div className="tool-card">
                            <h3>Midjourney</h3>
                            <p>Create images and graphics with AI</p>
                        </div>
                        <div className="tool-card">
                            <h3>Notion AI</h3>
                            <p>Note, manage tasks, and write documents</p>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>📈 How to start using AI</h2>
                    <ol className="steps-list">
                        <li>Specify the tasks you want AI to help with</li>
                        <li>Select the appropriate AI tool</li>
                        <li>Learn the basic usage methods</li>
                        <li>Try it out and improve</li>
                        <li>Measure results and develop continuously</li>
                    </ol>
                </div>

                <div className="content-section">
                    <h2>⚠️ Warning</h2>
                    <div className="warning-box">
                        <p>1. Check the accuracy of the data created by AI</p>
                        <p>2. Be careful of copyright infringement</p>
                        <p>3. Be careful of data security</p>
                        <p>4. Use critical thinking to make decisions</p>
                    </div>
                </div>

                <div className="cta-section">
                    <h2>🚀 Ready to start using AI in work?</h2>
                    <p>Contact us for free advice on using AI in your business</p>
                    <a href="#contact" className="cta-button">Consult us</a>
                </div>

                <div className="content-section">
                    <h2>🌟 Popular AI tools in 2024</h2>
                    <div className="tools-grid">
                        {/* แสดง tools ตามหน้าปัจจุบัน */}
                        {tools.slice(indexOfFirstTool, indexOfLastTool).map((tool) => (
                            <div className="tool-card" key={tool.id}>
                                <h3>{tool.name}</h3>
                                <p>{tool.description}</p>
                                <div className="tool-features">
                                    <span className="pro">{tool.advantages}</span>
                                    <span className="con">{tool.disadvantages}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-container">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink 
                                            onClick={() => setCurrentPage(index + 1)}
                                            isActive={currentPage === index + 1}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>

                <div className="content-section">
                    <h2>🎯 What can AI do?</h2>
                    <div className="work-categories">
                        <div className="category">
                            <h3>📝 Document and Writing</h3>
                            <ul>
                                <li>Write articles, blogs, and marketing content</li>
                                <li>Summarize documents and reports</li>
                                <li>Check grammar and spelling</li>
                                <li>Translate</li>
                            </ul>
                        </div>
                        <div className="category">
                            <h3>💻 Programming</h3>
                            <ul>
                                <li>Write and edit code</li>
                                <li>Debug code</li>
                                <li>Create API Documentation</li>
                                <li>Suggest solutions</li>
                            </ul>
                        </div>
                        <div className="category">
                            <h3>🎨 Creative</h3>
                            <ul>
                                <li>Create images and graphics</li>
                                <li>Design logos</li>
                                <li>Edit and decorate images</li>
                                <li>Create banners and marketing materials</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>📊 Effective AI usage techniques</h2>
                    <div className="tips-container">
                        <div className="tip">
                            <h3>1. Good Prompt Writing</h3>
                            <p>Write clear instructions, specify the details you need, and provide specific examples</p>
                        </div>
                        <div className="tip">
                            <h3>2. Check results</h3>
                            <p>Check the accuracy of the data and adjust the results to be suitable for use</p>
                        </div>
                        <div className="tip">
                            <h3>3. Use AI as a tool</h3>
                            <p>Use AI as a helper, not as a replacement for human creativity</p>
                        </div>
                    </div>
                </div>

                {/* สวนแสดงความคิดเห็น */}
                <div className="comments-section">
                    <h2>💬 Comments</h2>
                    
                    {/* ฟอร์มแสดงความคิดเห็น */}
                    <div className="comment-form">
                        <h3>Show comments</h3>
                        <form onSubmit={handleSubmitComment}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Your name" 
                                    className="form-input"
                                    value={comment.name}
                                    onChange={(e) => setComment({
                                        ...comment,
                                        name: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="form-input"
                                    value={comment.email}
                                    onChange={(e) => setComment({
                                        ...comment,
                                        email: e.target.value
                                    })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    placeholder="Write your comment here..." 
                                    className="form-textarea"
                                    rows="4"
                                    value={comment.content}
                                    onChange={(e) => setComment({
                                        ...comment,
                                        content: e.target.value
                                    })}
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="submit-comment"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send comment'}
                            </button>
                        </form>
                    </div>

                    {/* แสดงรายการความคิดเห็น */}
                    <div className="comments-list">
                        {isLoading ? (
                            <div className="loading-spinner">กำลังโหลดความคิดเห็น...</div>
                        ) : currentComments.length > 0 ? (
                            <>
                                {currentComments.map((comment) => (
                                    <div key={comment.id} className="comment-card">
                                        <div className="comment-header">
                                            <img 
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`} 
                                                alt="User Avatar" 
                                                className="comment-avatar" 
                                            />
                                            <div className="comment-meta">
                                                <h4>{comment.name}</h4>
                                                <span>{formatDate(comment.created_at)}</span>
                                            </div>
                                        </div>
                                        <p className="comment-text">
                                            {comment.content}
                                        </p>
                                        <div className="comment-actions">
                                            <button 
                                                className={`action-btn ${hasLikedComments[comment.id] ? 'liked' : ''}`}
                                                onClick={() => handleLike(comment.id)}
                                                style={{ color: hasLikedComments[comment.id] ? 'var(--green)' : 'inherit' }}
                                            >
                                                <i className={`fa${hasLikedComments[comment.id] ? 's' : 'r'} fa-thumbs-up`}></i> 
                                                <span>{likes[comment.id] || 0}</span>
                                            </button>
                                            <button 
                                                className="action-btn"
                                                onClick={() => setShowReplyForm(comment.id)}
                                            >
                                                <i className="far fa-comment"></i> Reply
                                            </button>
                                        </div>

                                        {/* แสดงการตอบกลับ */}
                                        {showReplyForm === comment.id && (
                                            <div className="reply-form">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Your name"
                                                        className="form-input"
                                                        value={replyForm.name}
                                                        onChange={(e) => setReplyForm({
                                                            ...replyForm,
                                                            name: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        placeholder="Your email"
                                                        className="form-input"
                                                        value={replyForm.email}
                                                        onChange={(e) => setReplyForm({
                                                            ...replyForm,
                                                            email: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <textarea
                                                        placeholder="Write your reply here..."
                                                        className="form-textarea"
                                                        value={replyForm.content}
                                                        onChange={(e) => setReplyForm({
                                                            ...replyForm,
                                                            content: e.target.value
                                                        })}
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="form-actions">
                                                    <button 
                                                        type="button" 
                                                        className="submit-reply"
                                                        disabled={isSubmitting}
                                                        onClick={() => handleReply(comment.id)}
                                                    >
                                                        {isSubmitting ? 'Sending...' : 'Send reply'}
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="cancel-reply"
                                                        onClick={() => setShowReplyForm(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* แสดงการตอบกลับที่มีอยู่ */}
                                        {replies[comment.id]?.length > 0 && (
                                            <>
                                                {getCurrentReplies(comment.id).currentReplies.map((reply, index) => (
                                                    <div key={index} className="reply-card">
                                                        <div className="reply-header">
                                                            <div className="reply-user">
                                                                <img 
                                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.name}`} 
                                                                    alt="User Avatar" 
                                                                    className="reply-avatar"
                                                                />
                                                                <div className="reply-meta">
                                                                    <strong>{reply.name}</strong>
                                                                    <span>{formatDate(reply.created_at)}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="reply-content">{reply.content}</p>
                                                        <div className="reply-actions">
                                                            <button 
                                                                className={`action-btn ${replyLikes[reply.id] ? 'liked' : ''}`}
                                                                onClick={() => handleReplyLike(reply.id)}
                                                                style={{ color: replyLikes[reply.id] ? 'var(--green)' : 'inherit' }}
                                                            >
                                                                <i className={`fa${replyLikes[reply.id] ? 's' : 'r'} fa-thumbs-up`}></i>
                                                                <span>{replyLikes[reply.id] || 0}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                                {/* เพิ่ม pagination สำหรับการตอบกลับ */}
                                                {replies[comment.id]?.length > repliesPerPage && (
                                                    <div className="reply-pagination">
                                                        <Pagination>
                                                            <PaginationContent>
                                                                <PaginationItem>
                                                                    <PaginationPrevious 
                                                                        onClick={() => handleReplyPageChange(
                                                                            comment.id, 
                                                                            Math.max((replyPages[comment.id] || 1) - 1, 1)
                                                                        )}
                                                                        disabled={replyPages[comment.id] === 1}
                                                                    />
                                                                </PaginationItem>
                                                                
                                                                {[...Array(getCurrentReplies(comment.id).totalPages)].map((_, index) => (
                                                                    <PaginationItem key={index}>
                                                                        <PaginationLink 
                                                                            onClick={() => handleReplyPageChange(comment.id, index + 1)}
                                                                            isActive={(replyPages[comment.id] || 1) === index + 1}
                                                                        >
                                                                            {index + 1}
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                ))}
                                                                
                                                                <PaginationItem>
                                                                    <PaginationNext 
                                                                        onClick={() => handleReplyPageChange(
                                                                            comment.id,
                                                                            Math.min(
                                                                                (replyPages[comment.id] || 1) + 1,
                                                                                getCurrentReplies(comment.id).totalPages
                                                                            )
                                                                        )}
                                                                        disabled={
                                                                            (replyPages[comment.id] || 1) === 
                                                                            getCurrentReplies(comment.id).totalPages
                                                                        }
                                                                    />
                                                                </PaginationItem>
                                                            </PaginationContent>
                                                        </Pagination>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                                
                                {/* เพิ่ม pagination สำหรับความคิดเห็น */}
                                {comments.length > commentsPerPage && (
                                    <div className="pagination-container">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious 
                                                        onClick={() => setCurrentCommentPage(prev => Math.max(prev - 1, 1))}
                                                        disabled={currentCommentPage === 1}
                                                    />
                                                </PaginationItem>
                                                
                                                {[...Array(totalCommentPages)].map((_, index) => (
                                                    <PaginationItem key={index}>
                                                        <PaginationLink 
                                                            onClick={() => setCurrentCommentPage(index + 1)}
                                                            isActive={currentCommentPage === index + 1}
                                                        >
                                                            {index + 1}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}
                                                
                                                <PaginationItem>
                                                    <PaginationNext 
                                                        onClick={() => setCurrentCommentPage(prev => 
                                                            Math.min(prev + 1, totalCommentPages)
                                                        )}
                                                        disabled={currentCommentPage === totalCommentPages}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="no-comments">
                                No comments yet! Be the first to show your comments!
                            </div>
                        )}
                    </div>
                </div>

                {/* เพิ่มส่วน AI Integration Workflow */}
                <div className="ai-integration-section">
                    <h2>🔄 AI Integration Workflow</h2>
                    <div className="ai-workflow">
                        <div className="workflow-step">
                            <h3>1. Analyze workflow</h3>
                            <p>Identify steps that can be improved with AI</p>
                        </div>
                        <div className="workflow-step">
                            <h3>2. Choose appropriate AI tools</h3>
                            <p>Consider the needs and budget when choosing tools</p>
                        </div>
                        <div className="workflow-step">
                            <h3>3. Try and adjust</h3>
                            <p>Use and adjust to be suitable for work</p>
                        </div>
                    </div>
                </div>

                {/* ส่วนคำนวณ ROI */}
                <div className="roi-calculator">
                    <h2>💰 Calculate ROI from using AI</h2>
                    <div className="calculator-input">
                        <div className="input-group">
                            <label>Hours worked per day</label>
                            <input 
                                type="number" 
                                min="0"
                                max="24"
                                className="form-input" 
                                value={roiInputs.hoursPerDay}
                                onChange={(e) => setRoiInputs(prev => ({
                                    ...prev,
                                    hoursPerDay: e.target.value
                                }))}
                            />
                        </div>
                        <div className="input-group">
                            <label>Hourly rate (THB)</label>
                            <input 
                                type="number"
                                min="0" 
                                className="form-input" 
                                value={roiInputs.ratePerHour}
                                onChange={(e) => setRoiInputs(prev => ({
                                    ...prev,
                                    ratePerHour: e.target.value
                                }))}
                            />
                        </div>
                        <div className="input-group">
                            <label>Time saved (%)</label>
                            <input 
                                type="number"
                                min="0"
                                max="100" 
                                className="form-input" 
                                value={roiInputs.timeSaved}
                                onChange={(e) => setRoiInputs(prev => ({
                                    ...prev,
                                    timeSaved: e.target.value
                                }))}
                            />
                        </div>
                    </div>
                    <button 
                        className="calculate-btn"
                        onClick={() => setRoiResults(calculateROI)}
                    >
                        Calculate ROI
                    </button>

                    {roiResults && (
                        <div className="roi-results">
                            <h3>Calculation Results</h3>
                            <div className="results-grid">
                                <div className="result-item">
                                    <span>Saved per day</span>
                                    <strong>{roiResults.daily.toLocaleString()} THB</strong>
                                </div>
                                <div className="result-item">
                                    <span>Saved per month</span>
                                    <strong>{roiResults.monthly.toLocaleString()} THB</strong>
                                </div>
                                <div className="result-item">
                                    <span>Saved per year</span>
                                    <strong>{roiResults.yearly.toLocaleString()} THB</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="share-section">
                <h3>Share this article</h3>
                <div className="social-buttons">
                    <button className="share-btn facebook"><i className="fab fa-facebook-f"></i></button>
                    <button className="share-btn whatsapp"><i className="fab fa-whatsapp"></i></button>
                    <button className="share-btn tiktok"><i className="fab fa-tiktok"></i></button>
                    <button className="share-btn line"><i className="fab fa-line"></i></button>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail2;
