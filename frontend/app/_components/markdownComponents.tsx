import type { Components } from "react-markdown";

const markdownComponents: Components = {
  a: ({ href, title, children }) => (
    <a href={href} title={title} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  ),
};

export default markdownComponents;
