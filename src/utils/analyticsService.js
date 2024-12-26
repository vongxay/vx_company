export const getAnalyticsData = async () => {
  try {
    // ตรวจสอบว่ามี gtag อยู่หรือไม่
    if (typeof window.gtag !== 'function') {
      throw new Error('Google Analytics not initialized');
    }

    // ดึงข้อมูลจาก GA4 Data API
    const response = await fetch(`https://www.googleapis.com/analytics/v4/data/realtime?property_id=${import.meta.env.VITE_GA_PROPERTY_ID}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GA_ACCESS_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }

    const data = await response.json();
    return {
      activeUsers: data.totalUsers || 0,
      pageViews: data.screenPageViews || 0,
      avgSessionDuration: data.averageSessionDuration || 0,
      bounceRate: data.bounceRate || 0
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {
      activeUsers: 0,
      pageViews: 0,
      avgSessionDuration: 0,
      bounceRate: 0
    };
  }
}; 