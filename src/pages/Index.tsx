import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

const Index = () => {
  const [content, setContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createPage = async () => {
    if (!content.trim()) {
      return; // Don't create empty pages
    }

    setIsCreating(true);
    const id = Math.random().toString(36).substring(2, 10);
    
    const { error } = await supabase
      .from("pages")
      .insert([{ id, content }]);

    if (error) {
      showError("Failed to create page. Please try again.");
      console.error("Error creating page:", error);
      setIsCreating(false);
      return;
    }
    
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
            disabled={isCreating}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={createPage} disabled={!content.trim() || isCreating} className="w-full">
            {isCreating ? "Creating..." : "Create Page"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;