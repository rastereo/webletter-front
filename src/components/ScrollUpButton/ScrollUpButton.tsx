import { ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton, ScaleFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function ScrollUpButton() {
  const [show, setShow] = useState<boolean>(false);

  function handleScroll() {
    const heightPage = document.documentElement.scrollHeight;

    if (window.scrollY > heightPage / 3) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll());

    return () => window.removeEventListener('scroll', () => handleScroll());
  }, []);

  return (
    <ScaleFade
      in={show}
      initialScale={0.4}
      style={{ position: 'fixed', bottom: '3%', right: '2%' }}
    >
      <IconButton
        type="button"
        variant="solid"
        colorScheme="teal"
        isRound
        aria-label="Scroll Up"
        size="lg"
        icon={<ArrowUpIcon fontSize="1.5rem" />}
        onClick={() => window.scrollTo(0, 0)}
        shadow="lg"
      />
    </ScaleFade>
  );
}

export default ScrollUpButton;
