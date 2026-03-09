
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};


const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;
    const category = slug[0] === "all" ? undefined : slug[0];

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, category],
        queryFn: () => fetchNotes("", 1, category),
    });
    return (
         <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <h1>Notes List</h1>
                <NotesClient category={category} />
            </div>
        </HydrationBoundary>
    );
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = slug[0] === "all" ? undefined : slug[0];
  
    const categoryName = category ?? "All";
  return {
    title: `Note: ${categoryName}`,
    description: `Note in ${categoryName} category`,
    openGraph: {
      title: `Note: ${categoryName}`,
      description:`Note in ${categoryName} category`,
      url: `https://notehub.com/notes/filter/${categoryName}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note ${categoryName}`,
        },
      ],
      type: 'article',
    },
  }
}

export default NotesByCategory;