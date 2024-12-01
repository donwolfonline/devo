interface PortfolioLayoutProps {
  children: React.ReactNode;
  username: React.ReactNode;
}

export default async function PortfolioLayout({
  children,
  username,
}: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="username-slot">
          {username}
        </div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
