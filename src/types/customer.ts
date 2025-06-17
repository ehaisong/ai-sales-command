
export interface Customer {
  id: string;
  name: string;
  company?: string;
  type: 'individual' | 'company';
  tags: string[];
  contactPerson?: string;
  contactMethod: string;
  dataSource: 'LinkedIn' | 'Google' | 'Meta' | 'Manual' | 'Import';
  customerScore: number;
  updatedDate: string;
  avatar?: string;
  email?: string;
  phone?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'prospect' | 'client';
  lastContact?: string;
  isActive: boolean;
  conversationHistory?: Array<{
    date: string;
    type: 'email' | 'call' | 'meeting';
    summary: string;
  }>;
}

export interface CustomerFilters {
  search: string;
  type: 'all' | 'individual' | 'company';
  dataSource: string[];
  scoreRange: [number, number];
  tags: string[];
  status: string[];
}
