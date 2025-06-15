
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, CheckCircle, AlertCircle } from "lucide-react";

interface URLInputSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
}

const URLInputSection: React.FC<URLInputSectionProps> = ({ url, onUrlChange }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = (inputUrl: string) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(inputUrl);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    onUrlChange(newUrl);
    
    if (newUrl) {
      setIsValidating(true);
      setTimeout(() => {
        setIsValid(validateUrl(newUrl));
        setIsValidating(false);
      }, 500);
    } else {
      setIsValid(null);
    }
  };

  const getValidationIcon = () => {
    if (isValidating) return null;
    if (isValid === true) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (isValid === false) return <AlertCircle className="w-5 h-5 text-red-500" />;
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          目标网址
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website-url">请输入需要加热的网址</Label>
          <div className="relative">
            <Input
              id="website-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={handleUrlChange}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getValidationIcon()}
            </div>
          </div>
          {isValid === false && (
            <p className="text-sm text-red-500">
              请输入有效的网址格式
            </p>
          )}
        </div>
        
        {isValid && url && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">网站验证成功</p>
              <p className="text-xs text-gray-500">{url}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default URLInputSection;
