"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useParams } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NotePreviewClient = () => {
  const router = useRouter();
    const closeModal = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();

   const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
   });
  
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;
  
  return (
    <Modal onClose={closeModal}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>
      <button onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreviewClient;