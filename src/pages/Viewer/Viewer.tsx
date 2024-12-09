import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import ViewerHeader from '../../components/ViewerHeader/ViewerHeader';
import Preview from '../../components/Preview/Preview';
import PlainText from '../../components/PlainText/PlainText';
import Webletter from '../../components/Webletter/Webletter';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import UserContext from '../../contexts/UserContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ScrollUpButton from '../../components/ScrollUpButton/ScrollUpButton';

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

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, '');

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { isDarkMode, mainApi } = useContext(UserContext);

  useDocumentTitle(`Viewer – ${info?.title}`, true);

  async function getWebletterInfo() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const data = await mainApi.getWebletterInfo(id);

      setInfo(data);
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
    }
  }

  async function getText() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const { text, misspelledWords, stopWordsInText } =
        await mainApi.getWebletterText(id);

      setText(text);
      setMisspelledWords(misspelledWords);
      setStopWords(stopWordsInText);
    } catch (err) {
      if (err instanceof Error) setErrorMessage(err.message);
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

  const savePDFFile = useReactToPrint({ contentRef: iframeRef,documentTitle: info?.title });

  // const reactToPrintFn = () => {
  //   const content = iframeRef.current;
  //   if (content) {
  //     const iframeDoc =
  //       content.contentDocument || content.contentWindow?.document || null;
  //     if (iframeDoc) {
  //       html2pdf(iframeDoc.body, {
  //         filename: `${info?.title}.pdf`,
  //         image: { type: 'jpeg', quality: 1 },
  //         html2canvas: { scale: 2 },
  //         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    getWebletterInfo();
  }, []);

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

  // useReactToPrint({
  //   contentRef: iframeRef,
  //   nonce: 'nonce',
  //   copyShadowRoots: true,
  // });

  return (
    <main className="viewer">
      {info ? (
        <>
          <ViewerHeader
            id={id}
            size={size}
            isText={isText}
            info={info}
            handleDesktopButton={handleDesktopButton}
            handleMobileButton={handleMobileButton}
            handleTextButton={handleTextButton}
            handleSavePDFButton={() => savePDFFile()}
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

export default Viewer;
