import { FormControl, IconButton } from '@chakra-ui/react';
import { FaMobileAlt, FaDesktop } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

import ShareButton from '../ShareButton/ShareButton';
import Info from '../Info/Info';

import { ResultWebletter } from '../../types';

import './ViewerHeader.css';

interface ViewerHeaderProps {
  id: string;
  size: number | null;
  isText: boolean;
  info: ResultWebletter
  handleDesktopButton: () => void;
  handleMobileButton: (width: number) => void;
  handleTextButton: () => void;
  // toggleDarkMode: (isDark: boolean) => void;
}

function ViewerHeader({
  id,
  size,
  isText,
  info,
  handleDesktopButton,
  handleMobileButton,
  handleTextButton,
  // toggleDarkMode,
}: ViewerHeaderProps) {
  return (
    <header className="viewer-header">
      <Info uploadDate={info.upload_date} size={info.size} />
      <FormControl display="flex" gap={2} width="auto">
        <IconButton
          variant={!size && !isText ? 'solid' : 'outline'}
          colorScheme="teal"
          aria-label="Desktop size"
          size="lg"
          isRound={true}
          icon={<FaDesktop />}
          onClick={() => handleDesktopButton()}
        />
        <IconButton
          variant={size ? 'solid' : 'outline'}
          colorScheme="teal"
          aria-label="Mobile size"
          size="lg"
          isRound={true}
          icon={<FaMobileAlt />}
          onClick={() => handleMobileButton(375)}
        />
        <IconButton
          variant={isText ? 'solid' : 'outline'}
          colorScheme="teal"
          aria-label="Plain text"
          size="lg"
          isRound={true}
          icon={<FiFileText />}
          onClick={() => handleTextButton()}
        />
      </FormControl>
      <ShareButton id={id} />
    </header>
  );
}

export default ViewerHeader;
