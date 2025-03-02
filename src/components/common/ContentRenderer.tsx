import styled from "styled-components";
import { ContentData } from "../../content/types";

interface ContentRendererProps {
  content: ContentData;
  depth?: number;
}

const ContentText = styled.p<{ depth: number }>`
  margin-left: ${({ depth }) => depth * 16}px;
  white-space: pre-wrap;
`;

export const ContentRenderer = ({
  content,
  depth = 0,
}: ContentRendererProps) => {
  if (typeof content === "string") {
    return <ContentText depth={depth}>{content}</ContentText>;
  }

  if (Array.isArray(content)) {
    return (
      <ul style={{ marginLeft: `${depth * 16}px` }}>
        {content.map((item, index) => (
          <li key={index}>
            <ContentRenderer content={item} depth={depth + 1} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof content === "object") {
    return (
      <div style={{ marginLeft: `${depth * 16}px` }}>
        {Object.entries(content).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong>
            <ContentRenderer content={value} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }

  return null;
};
