class AnalyticsHelper {
    constructor() {
        this.isInitialized = false;
        // ประกาศ gtag เป็น global และกำหนดค่าเริ่มต้น
        window.gtag = window.gtag || ((...args) => {
            (window.dataLayer = window.dataLayer || []).push(args);
        });
        
        if (window.gtag) {
            this.init();
        } else {
            window.addEventListener('load', () => this.init());
        }
    }

    init() {
        if (typeof gtag !== 'function') {
            console.error('Google Analytics ไม่ได้ถูกโหลด');
            return;
        }
        this.isInitialized = true;
        this.setupEventListeners();
    }

    // ติดตามการคลิกลิงก์
    trackLink(element, category = 'link') {
        if (!this.isInitialized || !element) return;
        
        // ตรวจสอบ gtag ผ่าน window object
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'click', {
                'event_category': category,
                'event_label': element.href || element.innerText || 'unknown',
                'link_url': element.href || 'unknown',
                'link_text': element.innerText || 'unknown',
                'link_id': element.id || 'unknown'
            });
        }
    }

    // ติดตามการเลื่อนหน้า
    trackScroll() {
        if (!this.isInitialized) return;
        
        const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', {
                'event_category': 'engagement',
                'value': Math.min(scrollDepth, 100) // ป้องกันค่าเกิน 100
            });
        }
    }

    // ติดตามเวลาที่ใช้ในหน้า
    trackTimeSpent() {
        const timeSpent = Math.round((new Date() - this.pageLoadTime) / 1000);
        window.gtag('event', 'time_spent', {
            'event_category': 'engagement',
            'value': timeSpent
        });
    }

    // ติดตามการส่งฟอร์ม
    trackForm(formElement, formName) {
        if (!this.isInitialized) return;
        
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'form_submit', {
                'event_category': 'forms',
                'event_label': formName,
                'form_id': formElement.id
            });
        }
    }

    // ติดตามการค้นหา
    trackSearch(searchTerm) {
        if (!this.isInitialized) return;
        
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'search', {
                'search_term': searchTerm
            });
        }
    }

    // ติดตามการดูวิดีโอ
    trackVideo(action, videoName) {
        if (!this.isInitialized) return;
        
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'video_' + action, {
                'event_category': 'videos',
                'event_label': videoName
            });
        }
    }

    setupEventListeners() {
        // ติดตามการคลิกลิงก์อัตโนมัติ
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                this.trackLink(link);
            }
        });

        // ปรับปรุงการติดตามการเลื่อนหน้าด้วย throttle
        let lastScrollTime = 0;
        const scrollThrottle = 2000; // 2 ินาที

        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - lastScrollTime >= scrollThrottle) {
                this.trackScroll();
                lastScrollTime = now;
            }
        });

        // ติดตามการส่งฟอร์ม
        document.addEventListener('submit', (e) => {
            if (e.target.tagName === 'FORM') {
                this.trackForm(e.target, e.target.id || 'unknown_form');
            }
        });

        // เริ่มจับเวลา
        this.pageLoadTime = new Date();
        // ส่งข้อมูลเวลาที่ใช้เมื่อออกจากหน้า
        window.addEventListener('beforeunload', () => {
            this.trackTimeSpent();
        });
    }
}

// เริ่มใช้งาน
const analytics = new AnalyticsHelper();
export default analytics;

// ตัวอย่างการใช้งานฟังก์ชันพิเศษ
window.trackCustomEvent = function(eventName, params = {}) {
    if (typeof window.gtag !== 'function' || !eventName) return;
    window.gtag('event', eventName, params);
} 