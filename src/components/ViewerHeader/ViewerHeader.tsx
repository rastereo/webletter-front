import { IconButton } from "@chakra-ui/react";
import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

import "./ViewerHeader.css";

interface ViewerHeaderProps {
  size: number | null;
  isText: boolean;
  handleDesktopButton: () => void;
  handleMobileButton: (width: number) => void;
  handleTextButton: () => void;
}

function ViewerHeader({
  size,
  isText,
  handleDesktopButton,
  handleMobileButton,
  handleTextButton,
}: ViewerHeaderProps) {
  return (
    <header className="viewer-header">
      <IconButton
        variant={!size && !isText ? "solid" : "outline"}
        colorScheme="teal"
        aria-label="Desktop size"
        size="lg"
        isRound={true}
        icon={<FaDesktop />}
        onClick={() => handleDesktopButton()}
      />
      <IconButton
        variant={size ? "solid" : "outline"}
        colorScheme="teal"
        aria-label="Mobile size"
        size="lg"
        isRound={true}
        icon={<FaMobileAlt />}
        onClick={() => handleMobileButton(375)}
      />
      <IconButton
        variant={isText ? "solid" : "outline"}
        colorScheme="teal"
        aria-label="Plain text"
        size="lg"
        isRound={true}
        icon={<FiFileText />}
        onClick={() => handleTextButton()}
      />
    </header>
  );
}

export default ViewerHeader;
