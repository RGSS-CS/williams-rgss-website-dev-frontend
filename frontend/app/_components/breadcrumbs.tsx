import Link from "next/link";
import styles from "./breadcrumbs.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  tone?: "light" | "dark";
};

export default function Breadcrumbs({ items = [], tone = "light" }: BreadcrumbsProps) {
  const directories: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumbs" className={`${styles.breadcrumbs} ${styles[tone]}`}>
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
