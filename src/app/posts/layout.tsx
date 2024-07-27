import PostsHeader from "@/components/common/header/PostsHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PostsHeader />
      {children}
    </>
  );
}
