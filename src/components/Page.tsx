import { HTMLAttributes, useEffect, useState } from "react"
import { Colors } from "../constants"

export const Page = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      <MobilePage {...props} />
      <DesktopPage {...props} />
    </>
  )
}

export const MobilePage = (props: HTMLAttributes<HTMLDivElement>) => {
  const { width } = useWindowSize();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.mobile-ui');
    if (el == null) {
      return;
    }

    const displayValue = (el as any).computedStyleMap().get('display').value;
    setHide(displayValue === 'none');
  }, [width]);

  if (hide) {
    return null;
  }

  return (
    <div
      {...props}
      className={props.className == null ? `mobile-ui` : `mobile-ui ${props.className}`}
      style={{
        backgroundColor: Colors.Dark,
        minHeight: `100vh`,
        color: Colors.SoftWhite,
        fontSize: `1.6rem`,
        padding: `16px`,
        ...props.style,
      }}
    />
  );
}
export const DesktopPage = (props: HTMLAttributes<HTMLDivElement>) => {
  const { width } = useWindowSize();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.desktop-ui');
    if (el == null) {
      return;
    }

    const displayValue = (el as any).computedStyleMap().get('display').value;
    setHide(displayValue === 'none');
  }, [width]);

  if (hide) {
    return null;
  }

  return (
    <div
      {...props}
      className={props.className == null ? `desktop-ui` : `desktop-ui ${props.className}`}
      style={{
        backgroundColor: Colors.Dark,
        minHeight: `100vh`,
        color: Colors.SoftWhite,
        fontSize: `1.6rem`,
        padding: `16px`,
        ...props.style,
      }}
    />
  );
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{ width?: number }>({
    width: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}