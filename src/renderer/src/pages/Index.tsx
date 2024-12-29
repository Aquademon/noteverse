import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { NoteCard } from "../components/NoteCard";
import { Input } from "../components/ui/input";
import { Search, LayoutGrid, LayoutList, Filter } from "lucide-react";
import { CreateNoteDialog } from "../components/CreateNoteDialog";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

const DEMO_NOTES = [
  {
    id: 1,
    title: "Welcome to Notes",
    content:
      "Start creating your notes here. Click the + button to create a new note.",
    createdAt: new Date(),
    category: "Personal",
    priority: "medium",
    tags: ["welcome", "getting-started"],
  },
  {
    id: 2,
    title: "Meeting Notes",
    content: "Discuss project timeline and deliverables with the team.",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "Work",
    priority: "high",
    tags: ["meeting", "project"],
  },
  {
    id: 3,
    title: "Ideas",
    content:
      "1. Implement dark mode\n2. Add search functionality\n3. Create mobile app",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: "Projects",
    priority: "low",
    tags: ["ideas", "development"],
  },
];

const CATEGORIES = [
  "All",
  "Personal",
  "Work",
  "Study",
  "Projects",
  "Ideas",
  "Tasks",
  "Meetings",
  "Other",
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes] = useState(DEMO_NOTES);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNotes = notes.filter(
    (note) =>
      (selectedCategory === "All" || note.category === selectedCategory) &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const handleNoteClick = (id: number) => {
    toast("Opening note...", {
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Noteverse - Notes</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full md:w-auto">
                  <Filter className="h-4 w-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border shadow-lg"
              >
                {CATEGORIES.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
            <CreateNoteDialog />
          </div>
        </div>

        <div
          className={`grid gap-4 animate-fade-up ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredNotes.map((note) => (
            <div key={note.id} className="animate-in">
              <NoteCard
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                category={note.category}
                priority={note.priority}
                tags={note.tags}
                onClick={() => handleNoteClick(note.id)}
                viewMode={viewMode}
              />
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No notes found. Try adjusting your search or create a new note.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
