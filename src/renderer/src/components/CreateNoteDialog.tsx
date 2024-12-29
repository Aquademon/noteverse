import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Plus,
  FileText,
  Tags,
  Calendar,
  Flag,
  Folder,
  Clock,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { cn } from "../lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.date().optional(),
});

const CATEGORIES = [
  "Personal",
  "Work",
  "Study",
  "Projects",
  "Ideas",
  "Tasks",
  "Meetings",
  "Other",
];

const PRIORITIES = [
  { value: "low", label: "Low", color: "bg-green-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-red-500" },
];

export function CreateNoteDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      category: "",
      priority: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Note created!", {
      description: "Your note has been successfully created.",
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[95vw] max-h-[95vh] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[65vw] p-0 gap-0 bg-background dark:bg-background/95 dark:backdrop-blur supports-[backdrop-filter]:dark:bg-background/75">
        <DialogHeader className="flex flex-row items-center justify-between p-4 sm:p-6 border-b bg-muted/40 dark:bg-background/95">
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <FileText className="h-5 w-5" />
            Create New Note
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 sm:p-6 bg-background dark:bg-background/95">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter note title..."
                        className="h-9 sm:h-10 text-base sm:text-lg bg-background dark:bg-background/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Content
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your note content..."
                        className="min-h-[120px] sm:min-h-[200px] lg:min-h-[250px] resize-none text-base leading-relaxed bg-background dark:bg-background/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Category
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 sm:h-10 bg-background dark:bg-background/50">
                            <SelectValue placeholder="Select a category">
                              <div className="flex items-center gap-2">
                                <Folder className="h-4 w-4" />
                                <span>
                                  {field.value || "Select a category"}
                                </span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px] overflow-y-auto bg-background dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-border">
                          {CATEGORIES.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                              className="cursor-pointer hover:bg-muted focus:bg-muted"
                            >
                              <div className="flex items-center gap-2 py-1">
                                <Folder className="h-4 w-4 text-muted-foreground" />
                                <span>{category}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Priority
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 sm:h-10 bg-background dark:bg-background/50">
                            <SelectValue placeholder="Set priority">
                              <div className="flex items-center gap-2">
                                <Flag className="h-4 w-4" />
                                <span>{field.value || "Set priority"}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px] overflow-y-auto bg-background dark:bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-border">
                          {PRIORITIES.map((priority) => (
                            <SelectItem
                              key={priority.value}
                              value={priority.value}
                              className="cursor-pointer hover:bg-muted focus:bg-muted"
                            >
                              <div className="flex items-center gap-2 py-1">
                                <div
                                  className={`w-3 h-3 rounded-full ${priority.color}`}
                                />
                                <span>{priority.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Tags</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 h-9 sm:h-10 px-3 rounded-md border bg-background dark:bg-background/50">
                        <Tags className="h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Add tags separated by commas..."
                          {...field}
                          className="border-0 p-0 h-full focus-visible:ring-0 placeholder:text-muted-foreground bg-transparent"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-6 border-t bg-muted/40 dark:bg-background/95">
          <div className="flex items-center gap-2 text-sm text-muted-foreground order-2 sm:order-1">
            <Calendar className="h-4 w-4" />
            <span>Created: {format(new Date(), "PPP")}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto order-1 sm:order-2">
            <Button
              variant="outline"
              className="w-full sm:w-24 bg-background hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-24"
              onClick={form.handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
