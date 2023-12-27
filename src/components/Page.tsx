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
  const { children, ...otherProps} = props;

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
      {...otherProps}
      className={otherProps.className == null ? `desktop-ui` : `desktop-ui ${otherProps.className}`}
      style={{
        backgroundColor: Colors.DeepDark,
        minHeight: `100vh`,
        color: Colors.SoftWhite,
        fontSize: `1.6rem`,
        ...otherProps.style,
      }}
    >
      <div
        style={{
          backgroundColor: Colors.Dark,
          minHeight: `100vh`,
          maxWidth: '1024px',
          padding: `16px 64px`,
          boxShadow: `0px 0px 4px 20px ${Colors.Dark}`,
          fontSize: `1.6rem`,
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
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