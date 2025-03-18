import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { resizeIFrameToFirContent } from '@pages/Viewer/model/resizeIframeToFirContent';
import { RootState } from '@/app/store';

import './Webletter.scss';

import { IconButton } from '@chakra-ui/react';
import { LuImageOff, LuImage } from 'react-icons/lu';

interface WebletterProps {
  id: string;
  isHide: boolean;
  size: number | null;
  setIframeElement: (
    value: MutableRefObject<HTMLIFrameElement | null> | null
  ) => void;
}

function WebletterTest({ id, isHide, size, setIframeElement }: WebletterProps) {
  const [iframeDoc, setIframeDoc] = useState<Document | null>(null);
  const [imageList, setImageList] =
    useState<NodeListOf<HTMLImageElement> | null>(null);
  const [imageSrcList, setImageSrcList] = useState<string[]>([]);
  const [isRemoveImages, setIsRemoveImages] = useState<boolean>(false);

  const { isDarkMode } = useSelector((state: RootState) => state.user);

  const webletterUrl =
    process.env.NODE_ENV === 'development'
      ? '../../../test/TTR.html'
      : `${import.meta.env.VITE_APP_HTML_WEBLETTER_URL}/${id}`;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  function toggleDarkModeOnWebletter(isDarkMode: boolean) {
    if (!iframeDoc) return console.error('iframeDoc is null');

    iframeDoc.getElementById('dark-mode')?.remove();

    const scriptDarkMode = iframeDoc.createElement('script');

    scriptDarkMode.type = 'module';
    scriptDarkMode.id = 'dark-mode';

    if (isDarkMode) {
      scriptDarkMode.text = `
          DarkReader.enable({
          brightness: 90,
          contrast: 100,
          sepia: 0,
          grayscale: 0,
          });
        `.toString();
    } else {
      scriptDarkMode.text = `
          DarkReader.disable();
        `.toString();
    }

    iframeDoc.body.appendChild(scriptDarkMode);
  }

  function handleIframeLoad() {
    setIframeDoc(
      iframeRef.current?.contentDocument ||
        iframeRef.current?.contentWindow?.document ||
        null
    );

    setIframeElement(iframeRef);
  }

  function removeImageSrc() {
    if (imageList) {
      const srcList: string[] = [];

      imageList.forEach((image) => {
        srcList.push(image.src);

        image.src = '';
      });

      setImageSrcList(srcList);
      setIsRemoveImages(true);
    }
  }

  function restoreImageSrc() {
    if (imageSrcList || imageList) {
      imageList?.forEach((image, index) => {
        image.src = imageSrcList[index];
      });

      setIsRemoveImages(false);
    }
  }

  useEffect(() => {
    if (iframeDoc) {
      const script = iframeDoc.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/darkreader@4.9.105/darkreader.min.js';

      iframeDoc.head.appendChild(script);

      resizeIFrameToFirContent(iframeRef, iframeDoc);
      script.onload = () => toggleDarkModeOnWebletter(isDarkMode);

      setImageList(iframeDoc.querySelectorAll('img'));
    }
  }, [iframeDoc]);

  useEffect(() => {
    if (iframeDoc) {
      toggleDarkModeOnWebletter(isDarkMode);
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isHide) {
      resizeIFrameToFirContent(iframeRef, iframeDoc);
    }
  }, [size, isRemoveImages]);

  return (
    <section className={`webletter ${isHide && 'hide'}`}>
      <iframe
        className="webletter__iframe"
        src={webletterUrl}
        ref={iframeRef}
        scrolling="no"
        onLoad={handleIframeLoad}
      />
      <p className="webletter__unsubscribe">
        Чтобы отписаться от этой рассылки, перейдите по{' '}
        <Link to="" className="webletter__link">
          ссылке
        </Link>
      </p>
      <IconButton
        variant={'outline'}
        colorScheme={isRemoveImages ? 'green' : 'red'}
        aria-label={isRemoveImages ? 'Restore Images' : 'Remove Images'}
        size="lg"
        fontSize="25px"
        icon={isRemoveImages ? <LuImage /> : <LuImageOff />}
        position={'absolute'}
        top="5px"
        right="5px"
        border="none"
        onClick={isRemoveImages ? restoreImageSrc : removeImageSrc}
      />
    </section>
  );
}

export default WebletterTest;
