import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Tag } from "lucide-react";

interface NoteCardProps {
  title: string;
  content: string;
  createdAt: Date;
  category: string;
  priority: string;
  tags: string[];
  onClick: () => void;
  viewMode: "grid" | "list";
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export function NoteCard({
  title,
  content,
  createdAt,
  category,
  priority,
  tags,
  onClick,
  viewMode,
}: NoteCardProps) {
  return (
    <Card
      className={`note-card cursor-pointer ${
        viewMode === "list"
          ? "flex gap-4 items-start p-4 md:p-6"
          : "flex flex-col p-4"
      }`}
      onClick={onClick}
    >
      <div className={viewMode === "list" ? "flex-1 min-w-0" : ""}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg truncate">{title}</h3>
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${getPriorityColor(
              priority
            )}`}
          />
        </div>
        <p
          className={`text-muted-foreground ${
            viewMode === "list" ? "line-clamp-1" : "line-clamp-3"
          } mb-4`}
        >
          {content}
        </p>
        <div className="space-y-2">
          <Badge variant="secondary" className="font-normal">
            {category}
          </Badge>
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-3 w-3 text-muted-foreground shrink-0" />
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
