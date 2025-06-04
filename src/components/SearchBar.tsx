"use client";
import { useState } from "react";
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
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Search HTTP code or title..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
