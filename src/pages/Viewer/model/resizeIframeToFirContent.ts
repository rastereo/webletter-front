export function resizeIFrameToFirContent(
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>,
  iframeDoc: Document | null
) {
  if (iframeRef.current) {
    const iframe = iframeRef.current;

    const newHeight = iframeDoc?.body.scrollHeight;

    iframe.style.height = `${newHeight}px`;
  }
}
