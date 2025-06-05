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
      <div className={styles.header}>
        <div className={styles.logo}>StatusQuest</div>
        <SearchBar onSearch={setQuery} />
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
