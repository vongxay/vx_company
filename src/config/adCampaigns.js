export const adCampaigns = {
  searchCampaigns: [
    {
      name: "Software Development Laos",
      keywords: [
        "บริษัทพัฒนาซอฟต์แวร์ลาว",
        "รับทำเว็บไซต์เวียงจันทน์",
        "พัฒนาแอพพลิเคชันลาว",
        "software company vientiane",
        "web development laos",
        "ບໍລິສັດພັດທະນາຊອບແວລາວ",
        "ຮັບເຮັດເວັບໄຊລາວ",
        "custom software development vientiane",
        "enterprise software solutions laos",
        "รับทำซอฟต์แวร์ตามสั่งลาว",
        "พัฒนาระบบ ERP ลาว"
      ],
      negativeKeywords: [
        "ฟรี",
        "free",
        "tutorial",
        "how to"
      ],
      budget: "500$/month",
      targeting: {
        locations: ["Laos", "Thailand border provinces"],
        languages: ["th", "lo", "en"],
        devices: ["mobile", "desktop", "tablet"]
      },
      adSchedule: {
        weekdays: "9:00-17:00",
        weekend: "10:00-15:00"
      },
      ads: [
        {
          headline1: "ບໍລິສັດພັດທະນາຊອບແວຊັ້ນນຳຢູ່ລາວ",
          headline2: "ທີມງານມືອາຊີບ ປະສົບການ 5 ປີ+",
          description1: "ພັດທະນາເວັບໄຊ, ແອັບພລິເຄຊັ່ນ, ຊອບແວ",
          description2: "ดูแลตั้งแต่วางแผนจนถึงหลังการขาย",
          finalUrl: "https://vxtech.la/services/software-development",
          callToAction: "ติดต่อเลย"
        },
        {
          headline1_en: "Leading Software Company in Laos",
          headline2_en: "Professional Team with 5+ Years Experience",
          description1_en: "Web, Mobile & Custom Software Development"
        }
      ]
    },
    {
      name: "Digital Marketing Services",
      keywords: [
        "digital marketing laos",
        "SEO services vientiane",
        "social media marketing laos",
        "การตลาดออนไลน์ลาว",
        "โฆษณาออนไลน์เวียงจันทน์"
      ],
      negativeKeywords: [
        "สมัครงาน",
        "job",
        "free course"
      ],
      budget: "300$/month",
      targeting: {
        locations: ["Laos"],
        languages: ["th", "lo", "en"],
        devices: ["all"]
      },
      adSchedule: "all_day",
      ads: [
        {
          headline1: "บริการการตลาดดิจิทัลในลาว",
          headline2: "เพิ่มยอดขายด้วย Digital Marketing",
          headline3: "ทีมงานมืออาชีพ ROI คุ้มค่า",
          description1: "วางแผนการตลาดออนไลน์ครบวงจร",
          description2: "ดูแลโซเชียลมีเดีย SEO SEM โฆษณาออนไลน์",
          finalUrl: "https://vxtech.la/services/digital-marketing",
          callToAction: "รับคำปรึกษาฟรี"
        }
      ]
    }
  ],
  displayCampaigns: [
    {
      name: "Brand Awareness Campaign",
      targeting: {
        interests: ["technology", "business", "software development"],
        demographics: {
          age: ["25-54"],
          gender: "all",
          parentalStatus: "all",
          householdIncome: "top 50%"
        }
      },
      budget: "200$/month",
      placements: [
        "technology websites",
        "business news sites",
        "professional networks"
      ],
      bannerSizes: [
        "300x250",
        "728x90",
        "320x50"
      ]
    }
  ],
  remarketing: {
    audiences: [
      {
        name: "Website Visitors - Last 30 days",
        rules: {
          membershipDurationDays: 30,
          visitedPages: ["/*"]
        }
      },
      {
        name: "Service Page Visitors",
        rules: {
          membershipDurationDays: 60,
          visitedPages: ["/services/*"]
        }
      },
      {
        name: "Blog Readers",
        rules: {
          membershipDurationDays: 45,
          visitedPages: ["/blog/*"],
          timeOnSite: ">60seconds"
        }
      }
    ],
    campaigns: [
      {
        name: "Service Page Visitors Remarketing",
        budget: "150$/month",
        bidAdjustment: 1.2,
        ads: [
          {
            headline1: "กลับมาคุยกันต่อ",
            headline2: "รับส่วนลดพิเศษ 10%",
            description: "ปรึกษาฟรี ไม่มีค่าใช้จ่าย"
          }
        ]
      }
    ]
  }
};

// ฟังก์ชันสำหรับติดตามประสิทธิภาพแคมเปญ
export const trackCampaignPerformance = (campaignId, metrics) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'campaign_performance', {
      'event_category': 'Campaign Metrics',
      'event_label': campaignId,
      'clicks': metrics.clicks,
      'impressions': metrics.impressions,
      'conversions': metrics.conversions,
      'cost': metrics.cost,
      'roas': metrics.roas
    });
  }
};

// ฟังก์ชันสำหรับปรับ bid อัตโนมัติ
export const adjustBidding = (campaignId, performance) => {
  const ROAS_TARGET = 3; // Return on Ad Spend เป้าหมาย
  if (performance.roas < ROAS_TARGET) {
    // ลด bid ลง
    return {
      action: 'decrease_bid',
      amount: 0.1
    };
  }
  return {
    action: 'maintain_bid'
  };
};

// เพิ่มฟังก์ชันใหม่สำหรับติดตาม campaign
export const trackAdCampaign = (campaign, action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'event_category': 'Campaign',
      'event_label': campaign.name,
      'campaign_name': campaign.name,
      'campaign_type': campaign.type,
      'campaign_budget': campaign.budget
    });
  }
};

// เพิ่มฟังก์ชันใหม่
export const trackSEOPerformance = (pageMetrics) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'seo_performance', {
      'page_url': pageMetrics.url,
      'organic_position': pageMetrics.position,
      'organic_clicks': pageMetrics.clicks,
      'bounce_rate': pageMetrics.bounceRate,
      'avg_time_on_page': pageMetrics.timeOnPage
    });
  }
};
  