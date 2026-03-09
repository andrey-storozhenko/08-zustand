"use client";

import css from "./NoteForm.module.css"
import type { NoteFormValues } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';


interface NoteFormProps{
    categories: string[];
}

export default function NoteForm({ categories }: NoteFormProps) {
    const router = useRouter();
    const handleCancel = () => router.push('/notes/filter/all');

    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft(
            {
                ...draft,
                [event.target.name]: event.target.value,
            }
        );
    };

    const {mutate} = useMutation({
            mutationFn: createNote,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["notes"] });
                router.push('/notes/filter/all');
                clearDraft();
            },
    });

    const handleSubmit = (formData: FormData) => {
        const values: NoteFormValues = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as string,
        };
        mutate(values);
    };
    

    return (
        <form action={handleSubmit} className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" defaultValue={draft?.title} onChange={handleChange} className={css.input}  />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <textarea
                    id="content"
                    name="content"
                    rows={8}
                    defaultValue={draft?.content}
                    onChange={handleChange}
                    className={css.textarea}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <select id="tag" name="tag" defaultValue={draft?.tag} onChange={handleChange} className={css.select}>
                        {categories.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="button" onClick={handleCancel} className={css.cancelButton}>
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                    >
                    Create note
                    </button>
                </div>
            </form>
    );
}