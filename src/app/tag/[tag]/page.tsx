import TagPage from "./_components/TagPage";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const tag = (await params).tag;
  return <TagPage tag={tag} />;
}
