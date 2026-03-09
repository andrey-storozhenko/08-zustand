import axios from 'axios';
import type { Note } from "../types/note";
import type { NoteFormValues } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (title: string, page: number,  category?: string): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", {
         params: {
            search: title,
            page: page,
            perPage: 10,
            sortBy: "created",
            tag: category,
      },
        headers: {

            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data;
}

export const createNote = async ({ title, content, tag }: NoteFormValues):Promise<Note> => {
    const response = await axios.post<Note>("https://notehub-public.goit.study/api/notes",
        {
            title: title,
            content: content,
            tag: tag
        },
        {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
        }
       
    );
    return response.data;
}

export const deleteNote = async (id: string):Promise<Note> => {
    const response = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data;
}

export const fetchNoteById = async (id: string) => {
    const response = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data;
}