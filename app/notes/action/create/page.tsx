import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNote() {
    const tags = ["Work", "Personal", "Meeting", "Todo", "Shopping"];

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm categories={tags}></NoteForm>
            </div>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create new note",
    description: "On this page you can create a new note",
    openGraph: {
      title: "Create new note",
      description:  "On this page you can create a new note",
      url: `https://notehub.com/notes/action/create`,
      siteName: 'NoteHub',
      images: [
        {
           url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "create note",
        },
      ],
      type: 'article',
    },
  }
}
