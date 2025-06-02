import { statusCodes } from "@/data/statusCodes";
import StatusCard from "../../components/statusCard/statusCard";
import styles from "./encyclopedia.module.scss";

export default function EncyclopediaPage() {
  return (
    <div className={styles.encyclopediaContainer}>
      <h1>HTTP Status Codes Encyclopedia</h1>
      <div className={styles.cardsGrid}>
        {statusCodes.map((status) => (
          <StatusCard key={status.code} status={status} />
        ))}
      </div>
    </div>
  );
}
