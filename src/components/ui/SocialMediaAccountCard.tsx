
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, X, Facebook } from "lucide-react";

type Props = {
  name: string;
  logo: "linkedin" | "instagram" | "x" | "meta";
  desc: string;
  isBound: boolean;
  onBind?: () => void;
};

const iconMap = {
  linkedin: Linkedin,
  instagram: Instagram,
  x: X,
  meta: Facebook,
};

const colorMap = {
  linkedin: "text-[#0A66C2]",
  instagram: "text-[#E4405F]",
  x: "text-black",
  meta: "text-[#1877F2]",
};

const SocialMediaAccountCard: React.FC<Props> = ({ name, logo, desc, isBound, onBind }) => {
  const Icon = iconMap[logo];
  const color = colorMap[logo];

  return (
    <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 space-x-4 border border-gray-200">
      <div className="p-3 bg-white rounded-xl shadow-sm">
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{name}</span>
          {isBound ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">已绑定</span>
          ) : (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">未绑定</span>
          )}
        </div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
      <div>
        {isBound ? (
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" disabled>
            解绑
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="text-primary" onClick={onBind}>
            绑定
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialMediaAccountCard;
