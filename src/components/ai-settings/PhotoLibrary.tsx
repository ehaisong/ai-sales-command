import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Photo {
  id: string;
  url: string;
  name: string;
  uploaded: string;
}

const PhotoLibrary: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80`,
      name: "工作照片1.jpg",
      uploaded: "2025-06-15"
    },
    {
      id: "2", 
      url: `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      name: "生活照片1.jpg",
      uploaded: "2025-05-10"
    },
    {
      id: "3",
      url: `https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      name: "商务照片1.jpg", 
      uploaded: "2025-04-08"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random().toString(36),
            url: e.target?.result as string,
            name: file.name,
            uploaded: new Date().toISOString().split('T')[0]
          };
          setPhotos(prev => [...prev, newPhoto]);
          toast({ description: `照片 ${file.name} 上传成功` });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    toast({ description: "照片已删除" });
  };

  const handleDownloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = photo.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-2">
            上传基础照片供AI生成社交媒体内容，建议上传不同场景的高质量照片
          </div>
          <div className="text-xs text-muted-foreground">
            支持JPG/PNG格式，单张最大10MB，建议尺寸1024x1024或以上
          </div>
        </div>
        <div>
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button 
            onClick={() => document.getElementById('photo-upload')?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            上传照片
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="group relative overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownloadPhoto(photo)}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">{photo.name}</div>
                <div className="text-xs text-muted-foreground">上传于 {photo.uploaded}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <div className="text-lg font-medium mb-2">暂无照片</div>
          <div className="text-sm">点击上传按钮添加基础照片</div>
        </div>
      )}
    </div>
  );
};

export default PhotoLibrary;