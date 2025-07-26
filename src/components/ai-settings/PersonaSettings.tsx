
import React, { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const PersonaSettings: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>("/lovable-uploads/863076f0-5e79-4bb1-a8e5-587a8c9ce88c.png");
  const [name, setName] = useState("小思");
  const [role, setRole] = useState("AI营销助理");
  const [desc, setDesc] = useState("我是您的专属AI营销助理，擅长社交媒体管理、客户服务和内容创作。致力于为您提供智能化的营销解决方案，提升品牌影响力和客户满意度。");

  const handleSave = () => {
    // 使用 toast 显示保存成功提示
    toast({ description: "数字形象已保存" });
    // TODO: 保存逻辑
  };

  return (
    <form className="space-y-6" onSubmit={e => {e.preventDefault(); handleSave();}}>
      <div className="flex items-center gap-6">
        <ImageUpload value={avatar} onChange={setAvatar} />
        <div>
          <div className="font-medium text-gray-900 mb-1">AI助手头像</div>
          <div className="text-xs text-gray-500 mb-2">建议1:1比例，支持JPG/PNG，最大2MB</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">名称</label>
          <Input placeholder="如：李小智" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">角色/职位</label>
          <Input placeholder="如：CMO" value={role} onChange={e => setRole(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">简介</label>
        <Textarea placeholder="请输入AI助手简介，200字以内" maxLength={200} value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
      <div>
        <Button type="submit" className="w-full sm:w-auto">保存信息</Button>
      </div>
    </form>
  );
};

export default PersonaSettings;
