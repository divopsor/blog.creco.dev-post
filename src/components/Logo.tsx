import Link from "next/link";
import styles from './Logo.module.css';

export function Logo({ title = "Creco's Blog", href }: { title?: string; href?: string }) {
  if (href == null) {
    return <h1>{title}</h1>;
  }

  return (
    <Link href={href} className={styles.logo}>
      <h1>{title}</h1>
    </Link>
  );
}
