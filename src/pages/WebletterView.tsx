import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ResultWebletter } from "../types";
import {
  IconButton,
  Highlight,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { FaMobileAlt, FaDesktop } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

import "./WebletterView.css";

function WebletterView() {
  const [info, setInfo] = useState<ResultWebletter | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [isText, setIsText] = useState<boolean>(false);
  const [misspelledWords, setMisspelledWords] = useState<string[] | []>([]);
  const [stopWords, setStopWords] = useState<string[] | []>([]);
  const [isMisspelledWords, setIsMisspelledWords] = useState<boolean>(true);
  const [isStopWords, setIsStopWords] = useState<boolean>(false);

  const url = import.meta.env.VITE_APP_SERVER_URL;

  const { pathname } = useLocation();

  const id = pathname.replace(/\//g, "");

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  async function getWebletterInfo() {
    try {
      const data = await fetch(`${url}/api/${id}`);

      const info = await data.json();

      setInfo(info);
    } catch (err) {
      console.log(err);
    }
  }

  async function getText() {
    try {
      console.log(id);
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

  function handleRadioMisspelledWords() {
    setIsMisspelledWords(!isMisspelledWords);
    setIsStopWords(false);
  }

  function handleRadioIsStopWords() {
    setIsStopWords(!isStopWords);
    setIsMisspelledWords(false);
  }

  function createMonthAndDay(uploadDate: string): string {
    const shortMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(uploadDate);

    const month = shortMonth[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
  }

  function resizeIFrameToFirContent(iframe: HTMLIFrameElement | null) {
    if (iframe) {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframe.style.height = iframeDoc.body.scrollHeight + 'px';

        console.log(iframe.style.height);
      }
    }
  }

  useEffect(() => {
    getWebletterInfo();
    getText();
  }, []);

  useEffect(() => {
    if (!isText) {
      resizeIFrameToFirContent(iframeRef.current);
    }
  }, [size])

  return (
    <>
      <header className="format-menu">
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
      <main className="viewer" style={{ width: size ? size + "px" : "100%" }}>
        <section className="info">
          {size ? (
            <div className={`info__container info__container_mobile`}>
              <div className="info__wrapper">
                <p className="info__name info__name_mobile">
                  {info?.exhibition}
                </p>
                <p className="info__date info__date_mobile">
                  {info?.upload_date && createMonthAndDay(info?.upload_date)}
                </p>
              </div>
              <p>
                <span className="info__title info__title_mobile">
                  {info?.title}
                </span>
              </p>
              <p className="info__preheader info__preheader_mobile">
                {info?.preheader}
              </p>
            </div>
          ) : (
            <div className="info__container">
              <p className="info__name">{info?.exhibition}</p>
              <p>
                <span className="info__title">{info?.title}</span>{" "}
                <span className="info__preheader">- {info?.preheader}</span>
              </p>
              <p className="info__date">
                {info?.upload_date && createMonthAndDay(info?.upload_date)}
              </p>
            </div>
          )}
        </section>
        {isText && text ? (
          <section className="plain-text">
            <FormControl
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
              width="100%"
              pb="10px"
            >
              <FormLabel htmlFor="checker" mb="0">
                Проверка орфографии
                <Switch
                  id="spell-checker"
                  colorScheme="teal"
                  isChecked={isMisspelledWords}
                  onChange={() => handleRadioMisspelledWords()}
                  pl="5px"
                />
              </FormLabel>
              <FormLabel htmlFor="stop-words" mb="0">
                Стоп-слова
                <Switch
                  id="stop-words"
                  colorScheme="teal"
                  isChecked={isStopWords}
                  onChange={() => handleRadioIsStopWords()}
                  pl="5px"
                />
              </FormLabel>
            </FormControl>
            <p className="plain-text__content">
              <Highlight
                query={
                  isMisspelledWords
                    ? misspelledWords
                    : isStopWords
                    ? stopWords
                    : ""
                }
                styles={{
                  px: "2",
                  py: "1",
                  rounded: "full",
                  bg: `${
                    isMisspelledWords ? "red.100" : isStopWords && "blue.100"
                  }`,
                }}
              >
                {text}
              </Highlight>
            </p>
          </section>
        ) : (
          <section className="webletter">
            <iframe
              className="webletter__iframe"
              src={`${url}/webletter/${id}`}
              ref={iframeRef}
            />
          </section>
        )}
      </main>
    </>
  );
}

export default WebletterView;
