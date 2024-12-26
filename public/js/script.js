document.addEventListener('DOMContentLoaded', function() {
    // เริ่มต้นการทำงานของเมนู
    initializeMenu();
    
    // โหลดภาษาที่เคยเลือกไว้
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);
});

function initializeMenu() {
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }

    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
}

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // อัพเดท data-lang-key elements
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName.toLowerCase() === 'input' && element.placeholder) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // อัพเดทสถานะปุ่มภาษา
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });

    updateOtherElements(lang);
}

// เพิ่มฟังก์ชันสำหรับอัพเดทข้อความอื่นๆ
function updateOtherElements(lang) {
    const otherTranslations = {
        en: {
            readMore: "Read more",
            viewDetails: "View details",
            sendMessage: "Send Message",
            subscribe: "Subscribe",
            copyright: "All rights reserved"
        },
        lo: {
            readMore: "ອ່ານເພີ່ມເຕີມ",
            viewDetails: "ເບິ່ງລາຍລະອຽດ",
            sendMessage: "ສົ່ງຂໍ້ຄວາມ",
            subscribe: "ຕິດຕາມ",
            copyright: "ສະຫງວນລິຂະສິດ"
        }
    };

    // อัพเดทปุ่ม Read more
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'read more') {
            btn.textContent = otherTranslations[lang].readMore;
        }
        if (btn.textContent.trim().toLowerCase() === 'view details') {
            btn.textContent = otherTranslations[lang].viewDetails;
        }
        if (btn.value && btn.value.trim().toLowerCase() === 'send message') {
            btn.value = otherTranslations[lang].sendMessage;
        }
    });

    // อัพเดทปุ่ม Subscribe
    const subscribeBtn = document.querySelector('.btn-subscribe');
    if (subscribeBtn) {
        subscribeBtn.textContent = otherTranslations[lang].subscribe;
    }
}

// เพิ่มออบเจ็กต์ translations ไว้ด้านบนของไฟล์ก่อนฟังก์ชัน
const translations = {
    en: {
        // ใส่คีย์และค่าภาษาอังกฤษตามที่คุณต้องการ
    },
    lo: {
        // ใส่คีย์และค่าภาษาลาวตามที่คุณต้องการ
    }
}; 
