import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import ViewerMenu from './ViewerMenu/ViewerMenu';
import Preview from './Preview/Preview';
import PlainText from './PlainText/PlainText';
import Webletter from './Webletter/Webletter';
import { ScrollUpButton } from './ScrollUpButton/ScrollUpButton';
import { getWebletterInfo } from '../api/getWebletterInfo';
import { getText } from '../api/getText';
import { ErrorMessage } from '@widgets/ErrorMessage';
import { Loader } from '@widgets/Loader';
import useDocumentTitle from '@shared/lib/useDocumentTitle';
import { UserContext } from '@shared/contexts';

import { ResultWebletter } from '../../../types';

import './Viewer.css';

export function Viewer() {
  const [info, setInfo] = useState<ResultWebletter | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [isText, setIsText] = useState<boolean>(false);
  const [misspelledWords, setMisspelledWords] = useState<string[] | []>([]);
  const [stopWords, setStopWords] = useState<string[] | []>([]);
  const [isMisspelledWords, setIsMisspelledWords] = useState<boolean>(false);
  const [isStopWords, setIsStopWords] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [iframeDoc, setIframeDoc] = useState<Document | null>(null);

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, '');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { isDarkMode, mainApi } = useContext(UserContext);

  useDocumentTitle(`Viewer – ${info?.title}`, true);

  function handleDesktopButton() {
    setSize(null);
    setIsText(false);
  }

  function handleMobileButton(size: number) {
    setSize(size);
    setIsText(false);
  }

  function handleTextButton() {
    setIsText(true);
    setSize(null);
  }

  function handleCheckboxMisspelledWords() {
    setIsMisspelledWords(!isMisspelledWords);
    setIsStopWords(false);
  }

  function handleCheckboxStopWords() {
    setIsStopWords(!isStopWords);
    setIsMisspelledWords(false);
  }

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

  function resizeIFrameToFirContent() {
    if (iframeRef.current) {
      if (!iframeDoc)
        setIframeDoc(
          iframeRef.current.contentDocument ||
            iframeRef.current.contentWindow?.document ||
            null
        );

      if (iframeDoc) {
        iframeRef.current.style.height = iframeDoc.body.scrollHeight + 'px';
      }
    }
  }

  const handlePrint = useReactToPrint({
    contentRef: iframeRef,
    documentTitle: info?.title,
    copyShadowRoots: true,
    ignoreGlobalStyles: false,
  });

  useEffect(() => {
    getWebletterInfo(mainApi, setInfo, setErrorMessage, id);
  }, []);

  useEffect(() => {
    if (!text && isText)
      getText(
        mainApi,
        id,
        setText,
        setMisspelledWords,
        setStopWords,
        setErrorMessage
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isText]);

  useEffect(() => {
    if (!isText) {
      resizeIFrameToFirContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (iframeDoc) {
      const script = iframeDoc.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/darkreader@4.9.96/darkreader.min.js';

      iframeDoc.head.appendChild(script);

      resizeIFrameToFirContent();
      script.onload = () => toggleDarkModeOnWebletter(isDarkMode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeDoc]);

  useEffect(() => {
    if (iframeDoc) {
      toggleDarkModeOnWebletter(isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <main className="viewer">
      {info ? (
        <>
          <ViewerMenu
            id={id}
            size={size}
            isText={isText}
            info={info}
            handleDesktopButton={handleDesktopButton}
            handleMobileButton={handleMobileButton}
            handleTextButton={handleTextButton}
            handleSavePDFButton={handlePrint}
          />
          <div style={{ width: size ? size + 'px' : '100%' }}>
            <Preview
              size={size}
              exhibition={info.exhibition || 'Выставка'}
              upload_date={info.upload_date}
              title={info.title}
              preheader={info.preheader}
            />
            <Webletter
              id={id}
              isText={isText}
              ref={iframeRef}
              resizeIFrameToFirContent={resizeIFrameToFirContent}
            />
          </div>
          {isText &&
            (text ? (
              <PlainText
                text={text}
                misspelledWords={misspelledWords}
                stopWords={stopWords}
                isText={isText}
                isMisspelledWords={isMisspelledWords}
                isStopWords={isStopWords}
                handleIsMisspelledWords={handleCheckboxMisspelledWords}
                handleIsStopWords={handleCheckboxStopWords}
              />
            ) : (
              <Loader />
            ))}
          <ScrollUpButton />
        </>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </main>
  );
}
