import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";
import shutdownScreen from "../../assets/xp-shutdown-screen.png";

const ShutdownContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${shutdownScreen}) no-repeat center center/cover,
    ${({ theme }) => theme.colors.xpBlue};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    z-index: -1;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 300px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: white;
`;

interface ShutdownAnimationProps {
  onComplete?: () => void;
}

export const ShutdownAnimation = ({ onComplete }: ShutdownAnimationProps) => {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);

  return (
    <ShutdownContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProgressBar>
        <ProgressFill
          style={{ width }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          onAnimationComplete={() => {
            onComplete ? onComplete() : window.location.reload();
          }}
        />
      </ProgressBar>
    </ShutdownContainer>
  );
};
