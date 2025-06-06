"use client";

import { useState } from "react";
import { StatusCodeEntry } from "@/data/statusCodes";
import styles from "@/styles/statusCard.module.scss";

interface Props {
  data: StatusCodeEntry;
  query: string;
}

const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text
    ?.split(regex)
    ?.map((part, i) =>
      regex?.test(part) ? <mark key={i}>{part}</mark> : part
    );
};

export default function StatusCard({ data, query }: Props) {
  const {
    code,
    title,
    description,
    category,
    color,
    emoji,
    example,
    mock,
    tip,
  } = data;

  const baseUrl =
    typeof window !== "undefined"
      ? `${window?.location?.protocol}//${window?.location?.host}`
      : "";

  const fullUrl = `${baseUrl}${mock.url}`;
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<object | null>(null);

  const handleTryNow = () => {
    setLoading(true);
    setResponse(null);

    const delay = 400 + Math?.floor(Math?.random() * 1000);
    setTimeout(() => {
      setResponse(mock?.response);
      setLoading(false);
    }, delay);
  };

  return (
    <div className={styles.card} style={{ borderLeft: `6px solid ${color}` }}>
      <div className={styles.header}>
        <div className={styles.groupEmojiTitle}>
          <span className={styles.emoji}>{emoji}</span>
          <h2 className={styles.code}>
            {highlightMatch(`${title} - ${code}`, query)}
          </h2>
        </div>
        <span className={styles.category} style={{ backgroundColor: color }}>
          {highlightMatch(category, query)}
        </span>
      </div>

      <p className={styles.description}>{highlightMatch(description, query)}</p>

      <p className={styles.tip}>
        <strong>Tip:</strong> {highlightMatch(tip, query)}
      </p>

      <div className={styles.example}>
        <strong>Example:</strong> {highlightMatch(example, query)}
      </div>

      {mock?.method === "POST" && mock?.body && (
        <div className={styles.mock}>
          <strong>Mock Request Body:</strong>
          <div className={styles.codeBlock}>
            {JSON.stringify(mock?.body, null, 2)
              ?.split("\n")
              ?.map((line, i) => (
                <div key={i}>{highlightMatch(line, query)}</div>
              ))}
          </div>
        </div>
      )}

      <div className={styles.mock}>
        <strong>Try Mock Request:</strong>
        <div className={styles.tryNowSection}>
          <input
            id={`urlInput${code}`}
            name={`urlInput${code}`}
            autoComplete="off"
            type="text"
            value={`${mock?.method} ${fullUrl}`}
            readOnly
            className={styles.urlInput}
          />
          <button
            onClick={handleTryNow}
            disabled={loading}
            className={styles.tryBtn}
          >
            Try Now
          </button>
        </div>

        {loading && <p className={styles.loader}>Loading response...</p>}

        {response && (
          <div className={styles.codeBlock}>
            {JSON.stringify(response, null, 2)
              ?.split("\n")
              ?.map((line, i) => (
                <div key={i}>{highlightMatch(line, query)}</div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
