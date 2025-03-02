import styled from "styled-components";
import folderIcon from "../../assets/xp-folder-icon.png";

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const IconImage = styled.img.attrs({
  src: folderIcon,
})`
  width: 48px;
  height: 48px;
`;

const IconLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.system};
  font-size: 12px;
  text-align: center;
  color: white;
  text-shadow: 1px 1px black;
`;

export const Icon = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <IconContainer onClick={onClick}>
    <IconImage alt="Folder" />
    <IconLabel>{label}</IconLabel>
  </IconContainer>
);
