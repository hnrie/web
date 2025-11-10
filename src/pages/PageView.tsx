import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const PageView = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) {
        setLoading(false);
        setError(true);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching page:", error);
        setError(true);
        setContent(null);
      } else {
        setContent(data.content);
        setError(false);
      }
      setLoading(false);
    };

    fetchPage();
  }, [id]);

  const preprocessMarkdown = (text: string) => {
    const imageUrlRegex = /(?<![\](])(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif|svg|webp))/gi;
    return text.replace(imageUrlRegex, (url) => `![Image](${url})`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you are looking for does not exist or could not be loaded.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Go back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const processedContent = preprocessMarkdown(content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-8">
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{processedContent}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default PageView;