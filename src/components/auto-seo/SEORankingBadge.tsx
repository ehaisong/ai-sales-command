
import React from "react";
import { Badge } from "@/components/ui/badge";

interface SEORankingBadgeProps {
  platform: string;
  rank?: number;
}

const SEORankingBadge: React.FC<SEORankingBadgeProps> = ({ platform, rank }) => {
  const getRankColor = (rank?: number) => {
    if (!rank) return 'bg-gray-100 text-gray-600';
    if (rank <= 3) return 'bg-green-100 text-green-700';
    if (rank <= 10) return 'bg-yellow-100 text-yellow-700';
    if (rank <= 20) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="text-center">
      <div className="text-xs text-gray-500 mb-1">{platform}</div>
      <Badge className={`text-xs ${getRankColor(rank)}`}>
        {rank ? `#${rank}` : '未排名'}
      </Badge>
    </div>
  );
};

export default SEORankingBadge;
