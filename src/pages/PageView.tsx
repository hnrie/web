import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { pages } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const PageView = () => {
  const { id } = useParams<{ id: string }>();
  const content = id ? pages[id] : undefined;

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" /> Go back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-8">
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
        <div className="mt-8 text-center">
            <Button asChild variant="outline">
                <Link to="/">
                    <Home className="mr-2 h-4 w-4" /> Create a new page
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default PageView;