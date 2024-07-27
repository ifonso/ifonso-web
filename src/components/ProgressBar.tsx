type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-[2pt] bg-purple rounded-full flex items-center justify-start">
      <div
        className="bg-primary h-full rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
