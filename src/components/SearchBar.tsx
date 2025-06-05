"use client";
import { useState } from "react";
import { Search } from "lucide-react"; // or any icon library
import styles from "@/styles/SearchBar.module.scss";

interface Props {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.inputWrapper}>
      <Search className={styles.icon} size={18} />
      <input
        id="search"
        name="search"
        autoComplete="off"
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
