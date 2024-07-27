import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";

type MusicCardProps = {
  title: string;
  artist: string[];
  albumCover: string;
  isCurrentPlaying: boolean;
  isPaused: boolean;
  progress: number;
  totalDuration: number;
  userPlaying: boolean;
  playingTimeStamp: number;
};

enum TimePlayerStatus {
  SECONDS = "Played a few seconds ago.",
  MINUTES = "Played a few minutes ago.",
  HOURS = "Played a few hours ago.",
  DAYS = "Played a few days ago."
}

export function BigMusicCard({ title, artist, albumCover, isCurrentPlaying, isPaused, progress, totalDuration, userPlaying, playingTimeStamp }: MusicCardProps) {
  const [musicProgress, setMusicProgress] = useState(progress);
  const [isLoaded, setIsLoaded] = useState(false);

  const getProgressInPercentage = (progress: number, totalDuration: number): number => {
    return Math.floor((progress / totalDuration) * 100);
  };

  const getFormatedMissigTime = (progress: number, totalDuration: number): string => {
    const missingTime = totalDuration - progress;
    const minutes = Math.floor(missingTime / 60);
    const seconds = missingTime % 60;
    return `-${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const getTimePlayerStatus = (timestamp: number): string => {
    const getTimeDifference = (current: number, past: number) => (current - past) / 1000;
  
    const currentTime = Date.now();
    const diffInSeconds = getTimeDifference(currentTime, timestamp);
  
    if (diffInSeconds >= 86400) return TimePlayerStatus.DAYS;
    if (diffInSeconds >= 3600) return TimePlayerStatus.HOURS;
    if (diffInSeconds >= 60) return TimePlayerStatus.MINUTES;
    
    return TimePlayerStatus.SECONDS;
  }

  useEffect(() => {
    let intervalId: number | undefined;

    if (isCurrentPlaying && !isPaused)
      intervalId = setInterval(() => setMusicProgress(prev => Math.min(prev + 1, totalDuration || prev)), 1000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };

  }, [isCurrentPlaying, progress, totalDuration]);

  return (
    <div className="h-[360px] w-60 border-2 gap-0 border-purple bg-background rounded-xl overflow-clip relative transition-all duration-500">
      {/* Album Cover */}
      <div className="w-full bg-black">
        <img className={`w-full transition-all duration-500 ${userPlaying ? "opacity-40" : ""} ${ isLoaded ? "" : "opacity-0"}`} 
        src={albumCover} onLoad={() => setIsLoaded(true)} alt="album" />
        {userPlaying && (
          <img className="top-10 absolute w-full" src="https://i.ibb.co/nP9V9L3/anime-girl-dancing.gif" alt="" />
        )}
      </div>

      {/* Music Info */}
      <div className="w-full flex flex-col justify-between p-6 gap-2">

        {/* Title */}
        <div className="flex flex-col justify-between gap-1 w-full">
          <h1 className="max-w-full font-roboto text-primary font-normal text-sm truncate">
            {title}
          </h1>
          <p className="max-w-full font-roboto text-primary font-normal text-xs opacity-55 truncate">
            {artist.join(", ")}
          </p>
        </div>

        {/* Progress */}
        {isCurrentPlaying && (
          <div className="flex gap-2 items-center">
          <ProgressBar progress={getProgressInPercentage(musicProgress, totalDuration)}/>
          <p className="font-roboto text-[10px] text-primary">
            {getFormatedMissigTime(musicProgress, totalDuration)}
          </p>
        </div>
        )}
        {!isCurrentPlaying && (
          <div className="max-w-full font-roboto text-primary font-normal text-xs mt-2">
            {getTimePlayerStatus(playingTimeStamp)}
          </div>
        )}
      </div>
    </div>
  );
}