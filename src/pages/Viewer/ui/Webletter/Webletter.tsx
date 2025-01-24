import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { resizeIFrameToFirContent } from '@pages/Viewer/model/resizeIframeToFirContent';
import { RootState } from '@/app/store';

import './Webletter.scss';

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

  const { isDarkMode } = useSelector((state: RootState) => state.user);

  const webletterUrl =
    process.env.NODE_ENV === 'development'
      ? '../../../test/index.html'
      : `${import.meta.env.VITE_APP_WEBLETTER_URL}/${id}`;

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

  useEffect(() => {
    if (iframeDoc) {
      const script = iframeDoc.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/darkreader@4.9.96/darkreader.min.js';

      iframeDoc.head.appendChild(script);

      resizeIFrameToFirContent(iframeRef, iframeDoc);
      script.onload = () => toggleDarkModeOnWebletter(isDarkMode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

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
    </section>
  );
}

export default WebletterTest;
