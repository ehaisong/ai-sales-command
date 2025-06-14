
import React from "react";
import { Badge } from "@/components/ui/badge";

// Mock tag data
const tags = [
  { name: "创新", count: 6 },
  { name: "新品", count: 4 },
  { name: "A100", count: 3 },
  { name: "公司介绍", count: 5 },
  { name: "历史", count: 2 },
  { name: "发布会", count: 4 },
  { name: "说明书", count: 2 },
];

const TagCloud = () => {
  return (
    <div className="pb-2">
      <div className="font-semibold mb-1">产品标签</div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.name}
            className="cursor-pointer"
            style={{
              fontSize: `${Math.min(24, 14 + tag.count * 2)}px`,
              padding: "4px 12px",
            }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
