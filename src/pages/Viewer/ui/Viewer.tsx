import { MutableRefObject, useContext, useEffect, useState } from 'react';
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

import { IWebletter } from '@/types';

import './Viewer.scss';

export function Viewer() {
  const [info, setInfo] = useState<IWebletter | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [isText, setIsText] = useState<boolean>(false);
  const [misspelledWords, setMisspelledWords] = useState<string[] | []>([]);
  const [stopWords, setStopWords] = useState<string[] | []>([]);
  const [isMisspelledWords, setIsMisspelledWords] = useState<boolean>(false);
  const [isStopWords, setIsStopWords] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [iframeElement, setIframeElement] =
    useState<MutableRefObject<HTMLIFrameElement | null> | null>(null);

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, '');

  const { mainApi } = useContext(UserContext);

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

  const handlePrint = useReactToPrint({
    contentRef: iframeElement ? iframeElement : undefined,
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
              isHide={isText}
              size={size}
              setIframeElement={setIframeElement}
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
