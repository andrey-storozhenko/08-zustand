"use client";

import { useState } from "react";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {fetchNotes} from "../../../../lib/api";
import { useDebouncedCallback } from 'use-debounce';
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import Link from "next/link";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {

    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const { data, isFetching } = useQuery({
        queryKey: ["notes", searchQuery, page,tag],
        queryFn: () => fetchNotes(searchQuery, page,tag),
        placeholderData: keepPreviousData,
    })

    const updateSearchQuery = useDebouncedCallback(
        (value : string) => { 
            setSearchQuery(value);
            setPage(1);
        },300
    );
    
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox query={searchQuery} updateSearchQuery={updateSearchQuery}></SearchBox>
                <Link href="/notes/action/create">Create note</Link>
                {(data?.totalPages ?? 0) > 1 && <Pagination
                    pageCount={data?.totalPages ?? 0}
                    currentPage={page - 1}
                    onPageChange={(newPage) => setPage(newPage + 1)}
                />}
            </header>
            {isFetching && <div>Loading notes...</div>}
            {(data?.notes?.length ?? 0) > 0 && <NoteList notes={data?.notes ?? []}></NoteList>}
        </div>
    );
}