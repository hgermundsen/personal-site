import styled from "styled-components";
import { Icon } from "../common/Icon";

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px);
  grid-auto-rows: minmax(80px, auto);
  padding: 16px;
  height: calc(100vh - 40px); // Account for taskbar height
`;

export const DesktopIcons = ({
  sections,
  onOpen,
}: {
  sections: Record<string, any>;
  onOpen: (section: any) => void;
}) => (
  <DesktopGrid>
    {Object.values(sections).map((section) => (
      <Icon
        key={section.title}
        label={section.title}
        onClick={() => onOpen(section)}
      />
    ))}
  </DesktopGrid>
);
