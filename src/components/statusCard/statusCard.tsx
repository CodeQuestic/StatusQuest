import Link from "next/link";
import { StatusCode } from "@/data/statusCodes";
import styles from "./statusCard.module.scss";

type Props = {
  status: StatusCode;
};

export default function StatusCard({ status }: Props) {
  return (
    <Link href={`/encyclopedia/${status.code}`} className={styles.card}>
      <h2>
        {status.code} - {status.message}
      </h2>
      <p>{status.description}</p>
    </Link>
  );
}
