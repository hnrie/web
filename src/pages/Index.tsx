import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { pages } from "@/lib/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createPage = () => {
    if (!content.trim()) {
      return; // Don't create empty pages
    }

    // Simple random ID generation
    const id = Math.random().toString(36).substring(2, 10);
    pages[id] = content;
    navigate(`/p/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Page</CardTitle>
          <CardDescription>
            Write your content using Markdown. Click create to get a shareable link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="## Your Markdown content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] text-base"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={createPage} disabled={!content.trim()} className="w-full">
            Create Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;