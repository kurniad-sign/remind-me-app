export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-grow items-center justify-center h-full">
      {children}
    </div>
  );
}
