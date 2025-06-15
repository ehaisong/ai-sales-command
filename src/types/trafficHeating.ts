
export interface TrafficHeatingConfig {
  websiteUrl: string;
  dailyTraffic: number;
  durationDays: number;
  totalPoints: number;
  dailyPoints: number;
}

export interface TrafficHeatingRecord {
  id: string;
  websiteUrl: string;
  websiteTitle?: string;
  websiteFavicon?: string;
  dailyTraffic: number;
  durationDays: number;
  pointsDeducted: number;
  startTime: string;
  endTime: string;
  status: 'pending' | 'running' | 'completed' | 'paused' | 'cancelled';
  remainingDays?: number;
  createdAt: string;
}

export interface UserPoints {
  current: number;
  total: number;
  used: number;
  lastUpdated: string;
}
