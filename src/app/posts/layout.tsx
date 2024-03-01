import PostsHeader from "@/components/posts/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <PostsHeader />
      {children}
    </main>
  );
}
