import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  enable as enableDarkReader,
  disable as disableDarkReader,
} from 'darkreader';

import ViewerHeader from '../../components/ViewerHeader/ViewerHeader';
import Preview from '../../components/Preview/Preview';
import Info from '../../components/Info/Info';
import PlainText from '../../components/PlainText/PlainText';
import Webletter from '../../components/Webletter/Webletter';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

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

  const url = import.meta.env.VITE_APP_SERVER_URL;

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, '');

  async function getWebletterInfo() {
    try {
      const data: Response = await fetch(`${url}/api/${id}`);

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
      const res = await fetch(`${url}/api/${id}/text`);

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

  function toggleDarkMode(isDark: boolean) {
    const darkModeTheme = {
      brightness: 90, // Slightly reduced brightness for a dimmer look
      contrast: 100, // Standard contrast; you can adjust higher based on needs
      sepia: 0, // No sepia to maintain a cooler, more neutral tone
      grayscale: 0, // Do not apply grayscale unless specifically desired
    };

    if (isDark) {
      enableDarkReader(darkModeTheme);
    } else {
      disableDarkReader();
    }
  }

  useEffect(() => {
    getWebletterInfo();

    // enableDarkReader({
    //   brightness: 90, // Slightly reduced brightness for a dimmer look
    //   contrast: 100, // Standard contrast; you can adjust higher based on needs
    //   sepia: 0, // No sepia to maintain a cooler, more neutral tone
    //   grayscale: 0, // Do not apply grayscale unless specifically desired
    // });
  }, []);

  useEffect(() => {
    if (info?.title) {
      document.title = `Viewer – ${info?.title}`;
    }
  }, [info]);

  useEffect(() => {
    if (!text && isText) getText();
  }, [isText]);

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
        toggleDarkMode={toggleDarkMode}
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
        <Webletter id={id} isText={isText} size={size} url={url} />
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
