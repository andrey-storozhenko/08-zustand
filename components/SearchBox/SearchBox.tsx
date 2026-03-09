import css from "./SearchBox.module.css";

interface SearchBoxProps{
    query: string;
    updateSearchQuery: (value: string) => void;
}

export default function SearchBox({query,updateSearchQuery}:SearchBoxProps) {
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={query}
            onChange={(e) => updateSearchQuery(e.target.value)}
        />
    );
}