"use client";

import { useState } from "react";
import { statusCodeGroups } from "@/data/statusCodes";
import SearchBar from "@/components/SearchBar";
import { filterStatusCodes } from "@/utils/filterStatusCodes";
import StatusCard from "@/components/statusCard";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  const [query, setQuery] = useState("");
  const filteredCodes = filterStatusCodes(statusCodeGroups, query);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <button onClick={() => (window.location.href = '/')} style={{all: 'unset', cursor: 'pointer'}}>
            StatusQuest
          </button>
        </div>
        <SearchBar onSearch={setQuery} />
      </div>

      <div className={styles.content}>
        {query ? (
          filteredCodes?.length === 0 ? (
            <div className={styles.noResults}>
              <Image
                src="/notfound.svg"
                alt="No results found"
                width={200}
                height={200}
                className={styles.noResultsImage}
              />
              <p className={styles.noResultsText}>
                No results found for &quot;{query}&quot;.
              </p>
            </div>
          ) : (
            filteredCodes?.map((entry) => (
              <StatusCard key={entry?.code} data={entry} query={query} />
            ))
          )
        ) : (
          statusCodeGroups?.map((group) => (
            <section key={group?.series} className={styles.group}>
              <h2 className={styles.groupTitle}>
                {group?.title} ({group?.series})
              </h2>
              <p className={styles.groupDescription}>{group?.description}</p>
              {group?.codes?.map((entry) => (
                <StatusCard key={entry?.code} data={entry} query={query} />
              ))}
            </section>
          ))
        )}
      </div>
    </div>
  );
}
