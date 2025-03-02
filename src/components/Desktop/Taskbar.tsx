import styled from "styled-components";
import { WindowData } from "../../types";
import startIcon from "../../assets/xp-start-icon.png";
import notepadIcon from "../../assets/xp-notepad-icon.png";

const TaskbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: ${({ theme }) => theme.colors.taskbar};
  display: flex;
  align-items: center;
  border-top: 2px solid #ffffff;
`;

const StartButton = styled.button`
  background: ${({ theme }) => theme.colors.xpBlue};
  color: white;
  border: none;
  height: 100%;
  padding: 0 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OpenWindows = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 16px;
`;

const WindowButton = styled.button<{ isFocused?: boolean }>`
  background: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.xpBlue : theme.colors.taskbar};
  color: ${({ isFocused }) => (isFocused ? "white" : "black")};
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 200px;
`;

export const Taskbar = ({
  openWindows,
  onStartClick,
  onWindowFocus,
}: {
  openWindows: WindowData[];
  onStartClick: () => void;
  onWindowFocus: (id: number) => void;
}) => (
  <TaskbarContainer>
    <StartButton onClick={onStartClick}>
      <img src={startIcon} alt="Start" width="16" height="16" />
      Start
    </StartButton>

    <OpenWindows>
      {openWindows.map((window) => (
        <WindowButton
          key={window.id}
          onClick={() => onWindowFocus(window.id)}
          isFocused={window.id === openWindows[openWindows.length - 1]?.id}
        >
          <img src={notepadIcon} alt="Notepad" width="16" height="16" />
          {window.title}
        </WindowButton>
      ))}
    </OpenWindows>

    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
      <span style={{ padding: "0 8px" }}>
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  </TaskbarContainer>
);
