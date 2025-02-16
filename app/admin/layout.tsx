export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <h1 className="text-center text-3xl font-bold my-6">관리자 페이지</h1>
        <div className="container mx-auto">{children}</div>
      </div>
    );
  }
  