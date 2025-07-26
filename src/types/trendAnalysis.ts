export interface TrendingProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  sales: number;
  salesGrowth: string; // e.g., "+245%"
  category: string;
  brand: string;
  platform: string;
  trendScore: number; // 0-100
  predictedDemand: 'high' | 'medium' | 'low';
  lastUpdated: string;
  tags: string[];
}

export interface MarketAnalysisReport {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  insights: string[];
  recommendations: string[];
  confidenceLevel: number; // 0-100
}

export interface TrendFilter {
  dateRange: {
    start: string;
    end: string;
  };
  category?: string;
  platform?: string;
  minTrendScore?: number;
}