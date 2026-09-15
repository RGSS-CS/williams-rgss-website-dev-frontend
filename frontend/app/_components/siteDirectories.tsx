import Link from "next/link";
import styles from "./siteDirectories.module.css";

type SiteDirectory = {
  label: string;
  href?: string;
};

type SiteDirectoriesProps = {
  items?: SiteDirectory[];
  tone?: "light" | "dark";
};

export default function SiteDirectories({ items = [], tone = "light" }: SiteDirectoriesProps) {
  const directories: SiteDirectory[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Site directories" className={`${styles.siteDirectories} ${styles[tone]}`}>
      <ol>
        {directories.map((directory, index) => {
          const isCurrent = index === directories.length - 1;

          return (
            <li key={`${directory.label}-${index}`}>
              {index > 0 && <span aria-hidden="true" className={styles.separator}>/</span>}
              {!isCurrent && directory.href ? (
                <Link href={directory.href}>{directory.label}</Link>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>{directory.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
