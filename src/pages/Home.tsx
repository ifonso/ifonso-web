import { ArrowUp } from "lucide-react";

import { ProfileCard } from "../components/cards/ProfileCard";
import { Header } from "../components/Header";
import { BigMusicCard } from "../components/cards/BigMusicCard";

import { useWebSocket } from "../hooks/useWebSocket";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";


export function Home() {
  // Audio handling
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Web socket
  const musicState = useWebSocket("wss://ifonso-ws.up.railway.app/ws");

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(e.currentTarget.href, "_blank");
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        console.log("end");
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          console.log("end");
          setIsPlaying(false);
        });
      }
    };
  }, []);

  return (
    <div className="max-w-screen w-screen min-h-screen bg-darkbg flex flex-col items-center">
      {/* Top */}
      <div className="w-screen h-screen  bg-background">
        {/* Hero section */}
        <div className={`w-screen h-full flex flex-row justify-center relative transition-all duration-1000`}>

          {/* Main Hero */}
          <div className={`w-full max-w-5xl px-8 flex flex-col md:flex-row justify-start md:justify-center pt-16 md:pt-8 items-center gap-16 transition-all duration-1000 pb-8`}>
            {/* Header */}
            <Header show-links={true}/>

            {/* Profile */}
            <motion.div
            initial={{
              opacity: 0,
              x: 100
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            >
              <ProfileCard />
            </motion.div>
          </div>

          {/* Call to action */}
          <div className={`w-full flex flex-col items-center gap-4 absolute bottom-4 transition-all duration-300`}>
            <p className="w-2/3 text-center font-roboto text-sm text-secondary">What about exploring a little bit more?</p>
            <div className="origin-center rotate-0">
              <ArrowUp size={24} className="text-primary opacity-60 animate-upDown"/>
            </div>
          </div>
        </div>
      </div>

      {/* Rest */}
      <div className="max-w-5xl flex flex-col pb-16 items-center px-10 pt-16 gap-16">
        <section className="w-full flex flex-col gap-8 font-jet text-background">
          <h1 className="font-bold text-2xl md:text-3xl">If I Like Music?</h1>
          <p className="text-sm md:text-base">The answer is, "Can't code without it!". The last song I was listening to was:</p>
        </section>

        {/* Music Card */}
        { musicState && (
          <motion.div
          initial={{
            opacity: 0,
            x: 100
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="flex flex-col gap-8">
            <BigMusicCard
            title={musicState.music.name}
            artist={musicState.music.artists}
            albumCover={musicState.music.images[0].url}
            isCurrentPlaying={musicState.is_playing}
            isPaused={false}
            progress={musicState.progress_time_in_seconds}
            totalDuration={musicState.total_time_in_seconds}
            userPlaying={isPlaying}
            playingTimeStamp={musicState?.timestamp}
            />

            <div className="flex justify-between items-center text-xs font-roboto">
              <a href={musicState.music.link ?? "#"} onClick={handleLinkClick} className="text-mint py-4 px-4 border border-background rounded-xl">
                <u>Try on Spotify</u>
              </a>
              <button onClick={togglePlay} className={`transition-all duration-200 py-4 px-7 font-bold bg-background border border-background rounded-xl hover:bg-mint
              ${ isPlaying ? "hover:bg-cred" : "hover:bg-mint" }`}
              >
                {isPlaying ? "Stop" : "Play"}
              </button>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <p className="w-full font-roboto text-background text-sm md:text-base">
          Need something or want to chat? Send an <a href="email:ifonso" onClick={handleEmailClick}><u>email</u></a>, and I'll see what I can do for you!
        </p>
      </div>

      <section className="w-screen py-4 flex gap-2 items-center justify-center bg-purple text-primary text-lg font-jet">
      &copy; 2024 iFonso
      </section>
      <audio ref={audioRef} src={musicState?.music.preview_link} />
    </div>
  )
}