import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ViewerHeader from '../../components/ViewerHeader/ViewerHeader';
import Preview from '../../components/Preview/Preview';
import Info from '../../components/Info/Info';
import PlainText from '../../components/PlainText/PlainText';
import Webletter from '../../components/Webletter/Webletter';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import UserContext from '../../contexts/UserContext';

import { ResultWebletter } from '../../types';

import './Viewer.css';

function Viewer() {
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

  const url = import.meta.env.VITE_APP_SERVER_URL;

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, '');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { isDarkMode } = useContext(UserContext);

  async function getWebletterInfo() {
    try {
      const data: Response = await fetch(`${url}/api/webletters/${id}`, {
        credentials: 'include',
      });

      if (!data.ok) {
        const errorData = await data.json();

        console.log(errorData);

        throw new Error(errorData.message);
      }

      const info = await data.json();

      setInfo(info);
    } catch (err) {
      setErrorMessage(
        (err as Error).message || 'Что-то пошло не так, попробуйте позже'
      );
      console.log(err);
    }
  }

  async function getText() {
    try {
      const res = await fetch(`${url}/api/webletters/${id}/text`, {
        credentials: 'include',
      });

      const { text, misspelledWords, stopWordsInText } = await res.json();

      setText(text);
      setMisspelledWords(misspelledWords);
      setStopWords(stopWordsInText);
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    getWebletterInfo();
  }, []);

  useEffect(() => {
    if (info?.title) {
      document.title = `Viewer – ${info?.title}`;
    }
  }, [info]);

  useEffect(() => {
    if (!text && isText) getText();
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

  return info ? (
    <>
      <ViewerHeader
        id={id}
        url={url}
        size={size}
        isText={isText}
        handleDesktopButton={handleDesktopButton}
        handleMobileButton={handleMobileButton}
        handleTextButton={handleTextButton}
      />
      <main className="viewer" style={{ width: size ? size + 'px' : '100%' }}>
        <Info uploadDate={info.upload_date} size={info.size} />
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
          url={url}
          ref={iframeRef}
          resizeIFrameToFirContent={resizeIFrameToFirContent}
        />
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
      </main>
    </>
  ) : errorMessage ? (
    <ErrorMessage message={errorMessage} />
  ) : (
    <Loader />
  );
}

export default Viewer;
