import { StatusCodeEntry } from "@/data/statusCodes";
import styles from "@/styles/statusCard.module.scss";

interface Props {
  data: StatusCodeEntry;
  query: string;
}

// Helper to wrap matched text with <mark>
const highlightMatch = (text: string, query: string) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text
    .split(regex)
    .map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : part));
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

  const responseString = JSON.stringify(mock.response, null, 2);

  return (
    <div className={styles.card} style={{ borderLeft: `6px solid ${color}` }}>
      <div className={styles.header}>
        <span className={styles.emoji}>{emoji}</span>
        <h2 className={styles.code}>
          {highlightMatch(`${code} - ${title}`, query)}
        </h2>
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

      <div className={styles.mock}>
        <strong>Mock Request:</strong>
        <div className={styles.codeBlock}>
          {highlightMatch(
            `${mock.method} ${mock.url}\nResponse:\n${responseString}`,
            query
          )}
        </div>
      </div>
    </div>
  );
}
