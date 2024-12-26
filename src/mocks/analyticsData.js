export const getMockAnalyticsData = () => {
  // สร้างข้อมูลจำลอง 7 วันย้อนหลัง
  const dates = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('lo-LA', { weekday: 'short' });
  });

  return {
    visitors: Array.from({length: 7}, () => Math.floor(Math.random() * 200 + 100)),
    pageViews: Array.from({length: 7}, () => Math.floor(Math.random() * 300 + 200)),
    dates: dates,
    currentVisitors: Math.floor(Math.random() * 50 + 10),
    totalPageViews: Math.floor(Math.random() * 1000 + 500),
    avgSessionDuration: Math.floor(Math.random() * 300 + 120),
    bounceRate: Math.floor(Math.random() * 40 + 20),
    sources: {
      'Direct': Math.floor(Math.random() * 40 + 20),
      'Social': Math.floor(Math.random() * 30 + 15),
      'Organic': Math.floor(Math.random() * 25 + 10),
      'Referral': Math.floor(Math.random() * 20 + 5)
    }
  };
}; 