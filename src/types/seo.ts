
export interface SEOKeyword {
  id: string;
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  difficulty: number; // 1-100
  currentRank?: number;
  targetRank: number;
  relatedKeywords: string[];
  createdAt: string;
}

export interface LandingPage {
  id: string;
  title: string;
  url: string;
  previewImage: string;
  targetKeywords: string[];
  seoScore: number; // 0-100
  rankings: {
    google?: number;
    baidu?: number;
    bing?: number;
  };
  analytics: {
    dailyViews: number;
    weeklyViews: number;
    monthlyViews: number;
    bounceRate: number;
    avgSessionTime: number;
  };
  status: 'published' | 'generating' | 'optimizing' | 'draft';
  loadSpeed: number; // 毫秒
  mobileOptimized: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SEOAnalysis {
  url: string;
  overallScore: number;
  issues: {
    critical: SEOIssue[];
    warning: SEOIssue[];
    notice: SEOIssue[];
  };
  recommendations: string[];
  keywordDensity: Record<string, number>;
  pageSpeed: {
    desktop: number;
    mobile: number;
  };
  analyzedAt: string;
}

export interface SEOIssue {
  id: string;
  type: 'critical' | 'warning' | 'notice';
  title: string;
  description: string;
  suggestion: string;
}
