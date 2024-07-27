import { useEffect, useState, useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

import { GithubButton } from "./buttons/GithubButton";
import { GmailButton } from "./buttons/GmailButton";
import { LinkedinButton } from "./buttons/LinkedinButton";

const useTypewriter = (text: string, speed: number) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index]);
  useEffect(() => {
    if (index >= text.length)
      return;
      
    const timeoutId = setTimeout(() => {
      setIndex(i => i + 1);
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, text, speed]);

  return displayText;
};

export function Header(props: { "show-links": boolean }) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const springStyle = useSpring({
    loop: { reverse: true },
    from: { opacity: 1 },
    to: { opacity: 0 },
    delay: 200,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="w-full md:w-1/2 flex items-start justify-center flex-col gap-4">

    {/* Title and subtitle */}
    <div className="flex flex-col gap-2">
      <section className="flex font-jet text-5xl font-extrabold text-primary">
        <h1>{useTypewriter("iFonso", 140)}</h1>
        <animated.div style={springStyle}>_</animated.div>
      </section>
      <h2 className="font-roboto text-lg md:text-xl  text-primary">iOS & Backend developer.</h2>
    </div>

    {/* Social buttons */}
    { (props["show-links"] || windowDimensions.width > 768) && (<div className="flex items-center justify-start gap-8">
        <GithubButton action={() => handleLinkClick("https://github.com/ifonso")} />
        <LinkedinButton action={() => handleLinkClick("https://www.linkedin.com/in/ifonso")}/>
        <a href="mailto:ifonso.developer@gmail.com"><GmailButton/></a>
      </div>)
    }
  </div> 
  );
};