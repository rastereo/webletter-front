import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ResultWebletter } from "../types";
import "./WebletterView.css";
// import IframeResizer from "@iframe-resizer/react";

function WebletterView() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [info, setInfo] = useState<ResultWebletter | null>(null);

  const url = import.meta.env.VITE_APP_SERVER_URL;

  const { pathname } = useLocation();

  const id = pathname.replace("/", "");

  async function getWebletterInfo() {
    try {
      const data = await fetch(`${url}/api/${id}`);

      const info = await data.json();

      // console.log(info);

      setInfo(info);
    } catch (err) {
      console.log(err);
    }
  }

  function resizeIFrameToFirContent(event: SyntheticEvent<HTMLIFrameElement>) {
    const iframe = event.currentTarget;

    // Assuming you want to resize the iframe:
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframe.style.width = iframeDoc.body.scrollWidth + 'px';
        iframe.style.height = iframeDoc.body.scrollHeight + 'px';

        console.log(iframe.style.height)
      }
    }
  }

  useEffect(() => {
    getWebletterInfo();
  }, []);

  return (
    <section
      style={{ display: "flex", justifyContent: "center", height: "100%" }}
    >
      <iframe src={`${url}/webletter/${id}`} width="100%" height="100%" onLoad={(evt) => resizeIFrameToFirContent(evt)} />
    </section>
  );
}

export default WebletterView;
