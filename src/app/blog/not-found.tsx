import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="text-center max-w-md px-4">
        <BookOpen className="mx-auto mb-6 h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The blog post you are looking for might have been removed, 
          had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/blog" 
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
