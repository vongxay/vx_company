export const getAnalyticsData = async () => {
    return {
        activeUsers: [10, 15, 20, 25, 30],
        pageViews: [100, 150, 200, 250, 300],
        dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'],
        sources: {
            'Direct': 40,
            'Social': 30,
            'Organic': 20,
            'Referral': 10
        }
    };
}; 