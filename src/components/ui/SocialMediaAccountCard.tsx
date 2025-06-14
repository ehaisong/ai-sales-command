
import React from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Twitter, Settings } from "lucide-react";

type Props = {
  name: string;
  logo: "linkedin" | "instagram" | "twitter" | "settings";
  desc: string;
  isBound: boolean;
};

const iconMap = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  settings: Settings,
};

const SocialMediaAccountCard: React.FC<Props> = ({ name, logo, desc, isBound }) => {
  const Icon = iconMap[logo];

  return (
    <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 space-x-4 border border-gray-200">
      <div className="p-3 bg-white rounded-xl shadow-sm">
        <Icon className="w-6 h-6 text-primary" />
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
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">解绑</Button>
        ) : (
          <Button variant="outline" size="sm" className="text-primary">绑定</Button>
        )}
      </div>
    </div>
  );
};

export default SocialMediaAccountCard;
