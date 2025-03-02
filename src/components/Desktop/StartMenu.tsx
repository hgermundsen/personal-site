import styled from "styled-components";
import { motion } from "framer-motion";
import folderIcon from "../../assets/xp-folder-icon.png";
import restartIcon from "../../assets/xp-restart-icon.png";

const MenuContainer = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  left: 0;
  width: 240px;
  background: ${({ theme }) => theme.colors.taskbar};
  border: 2px outset #ffffff;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 4px 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.buttonHover};
    color: white;
  }
`;

export const StartMenu = ({
  sections,
  onOpen,
  onRestart,
}: {
  sections: Record<string, any>;
  onOpen: (section: any) => void;
  onRestart: () => void;
}) => (
  <MenuContainer initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
    <MenuList>
      {Object.values(sections).map((section) => (
        <MenuItem key={section.title} onClick={() => onOpen(section)}>
          <img src={folderIcon} alt="Folder" width="16" height="16" />
          {section.title}
        </MenuItem>
      ))}
      <hr style={{ margin: "4px 0", borderColor: "#FFFFFF" }} />
      <MenuItem onClick={onRestart}>
        <img src={restartIcon} alt="Shutdown" width="16" height="16" />
        Restart
      </MenuItem>
    </MenuList>
  </MenuContainer>
);
