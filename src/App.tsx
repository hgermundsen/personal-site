import { useEffect, useState } from "react";
import { ContentSection } from "./content/types";
import { ContentData } from "./content/types";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { DesktopIcons } from "./components/Desktop/DesktopIcons";
import { Taskbar } from "./components/Desktop/Taskbar";
import { StartMenu } from "./components/Desktop/StartMenu";
import { Window } from "./components/Desktop/Window";
import { theme } from "./styles/theme";
import { sections } from "./content";
import { WindowData } from "./types";
import { ShutdownAnimation } from "./components/Desktop/ShutdownAnimation";

const App = () => {
  const [openWindows, setOpenWindows] = useState<WindowData[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const openWindow = (section: ContentSection) => {
    setOpenWindows((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: section.title,
        content: section.content,
        position: { x: prev.length * 20, y: prev.length * 20 },
      },
    ]);
  };

  const handleWindowFocus = (windowId: number) => {
    // Bring window to front
    setOpenWindows((prevWindows) => [
      ...prevWindows.filter((w) => w.id !== windowId),
      prevWindows.find((w) => w.id === windowId)!,
    ]);
  };

  useEffect(() => {
    if (isRestarting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isRestarting]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <DesktopIcons sections={sections} onOpen={openWindow} />

      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          content={window.content}
          onClose={() =>
            setOpenWindows((prev) => prev.filter((w) => w.id !== window.id))
          }
        />
      ))}

      <Taskbar
        openWindows={openWindows}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onWindowFocus={handleWindowFocus}
      />

      {showStartMenu && (
        <StartMenu
          sections={sections}
          onOpen={openWindow}
          onRestart={() => setIsRestarting(true)}
        />
      )}

      {isRestarting && (
        <ShutdownAnimation
          onComplete={() => {
            setIsRestarting(false);
            setOpenWindows([]);
            setShowStartMenu(false);
          }}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
