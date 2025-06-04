"use client";

import { useState } from "react";
import { statusCodeGroups } from "@/data/statusCodes";
import SearchBar from "@/components/SearchBar";
import { filterStatusCodes } from "@/utils/filterStatusCodes";
import StatusCard from "@/components/statusCard";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [query, setQuery] = useState("");
  const filteredCodes = filterStatusCodes(statusCodeGroups, query);

  return (
    <div className={styles.wrapper}>
      {/* Header area */}
      <div className={styles.header}>
        <div className={styles.logo}>
          Status<span>Quest</span>
        </div>
        <SearchBar onSearch={setQuery} />
        <a
          href="https://github.com/your/repo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.4-1.33-1.77-1.33-1.77-1.09-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.31 3.48 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.23-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0C17 4.99 18 5.31 18 5.31c.66 1.64.24 2.86.12 3.16.78.85 1.23 1.92 1.23 3.23 0 4.61-2.8 5.63-5.48 5.93.42.36.8 1.1.8 2.22v3.29c0 .32.22.69.82.58A12 12 0 0012 .5z"
            />
          </svg>
        </a>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <h1>HTTP Status Codes</h1>

        {query ? (
          filteredCodes.length === 0 ? (
            <p>No results found for "{query}"</p>
          ) : (
            filteredCodes.map((entry) => (
              <StatusCard key={entry.code} data={entry} query={query} />
            ))
          )
        ) : (
          statusCodeGroups.map((group) => (
            <section key={group.series} className={styles.group}>
              <h2>
                {group.title} ({group.series})
              </h2>
              <p>{group.description}</p>
              {group.codes.map((entry) => (
                <StatusCard key={entry.code} data={entry} query={query} />
              ))}
            </section>
          ))
        )}
      </div>
    </div>
  );
}
