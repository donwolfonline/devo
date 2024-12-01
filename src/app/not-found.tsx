export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
