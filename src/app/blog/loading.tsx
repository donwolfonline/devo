import { Loader2 } from 'lucide-react';

export default function BlogLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading blog content...</p>
      </div>
    </div>
  );
}
