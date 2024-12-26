const sendGtagEvent = (event, params) => {
  if (typeof window.gtag === 'function') {
    window.gtag(event, ...params);
    console.log('Event sent:', event, params);
  } else {
    console.error('gtag is not available');
  }
};

export const setupVisitorTracking = () => {
  // ติดตามการแบ่งปันเนื้อหา
  document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', (e) => {
      sendGtagEvent('event', ['share', {
        'event_category': 'Content',
        'event_label': e.target.dataset.content
      }]);
    });
  });

  // ติดตามการดาวน์โหลด
  document.querySelectorAll('[data-download]').forEach(link => {
    link.addEventListener('click', (e) => {
      sendGtagEvent('event', ['download', {
        'event_category': 'Downloads',
        'event_label': e.target.dataset.download
      }]);
    });
  });

  // ติดตามการใช้เวลาในแต่ละหน้า
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    sendGtagEvent('event', ['time_on_page', {
      'event_category': 'Engagement',
      'event_label': window.location.pathname,
      'value': timeSpent
    }]);
  });

  // ติดตามแหล่งที่มาของ traffic
  if (document.referrer) {
    sendGtagEvent('event', ['referral_visit', {
      'event_category': 'Traffic Sources',
      'event_label': document.referrer
    }]);
  }
};

// ติดตามการ scroll
export const trackScroll = () => {
  let maxScroll = 0;
  let tracking = {
    25: false,
    50: false,
    75: false,
    90: false
  };

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    maxScroll = Math.max(maxScroll, scrollPercent);

    Object.keys(tracking).forEach(threshold => {
      if (!tracking[threshold] && maxScroll > threshold) {
        tracking[threshold] = true;
        sendGtagEvent('event', ['scroll_depth', {
          'event_category': 'Engagement',
          'event_label': `${threshold}%`,
          'non_interaction': true
        }]);
      }
    });
  });
}; 