import Draggable from "react-draggable";
import { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ContentData } from "../../content/types";
import { ContentRenderer } from "../common/ContentRenderer";

interface WindowProps {
  title: string;
  content: ContentData;
  onClose: () => void;
  isFocused?: boolean;
  onFocus?: () => void;
}

const WindowFrame = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !["isFocused"].includes(prop),
})<{ isFocused?: boolean }>`
  position: absolute;
  border: 3px solid ${({ theme }) => theme.colors.xpBlue};
  background: ${({ theme }) => theme.colors.windowBackground};
  box-shadow: ${({ isFocused }) =>
    isFocused ? "3px 3px 3px rgba(0,0,0,0.3)" : "none"};
  z-index: ${({ isFocused }) => (isFocused ? 100 : 1)};
`;

const TitleBar = styled.div`
  background: ${({ theme }) => theme.colors.xpBlue};
  color: white;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: move;
`;

const CloseButton = styled.button`
  background: #c0c0c0;
  border: 2px outset #ffffff;
  min-width: 24px;
  min-height: 24px;
  margin-left: 8px;
  font-family: ${({ theme }) => theme.fonts.system};
`;

export const Window = ({
  title,
  content,
  onClose,
  isFocused = false,
  onFocus,
}: WindowProps) => {
  // Change to HTMLDivElement and add type assertion
  const nodeRef = useRef<HTMLDivElement>(null!);

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>} // Type assertion here
      handle=".handle"
      bounds="parent"
      onStart={onFocus}
    >
      <WindowFrame
        ref={nodeRef}
        isFocused={isFocused}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <TitleBar className="handle" onMouseDown={onFocus}>
          <span>{title} - Notepad</span>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </TitleBar>
        <div style={{ padding: "16px", minWidth: "300px", minHeight: "200px" }}>
          <ContentRenderer content={content} />
        </div>
      </WindowFrame>
    </Draggable>
  );
};
