import Github from "../../assets/github.svg";
import { ButtonProps } from "../../types/buttonProps";

export function GithubButton({action, ...rest}: ButtonProps) {
  return (
    <button className="transition-all duration-200 w-12 h-12 hover:bg-mint rounded-lg" onClick={action} {...rest}>
      <img className="w-full h-full" src={Github} alt="github" />
    </button>
  );
};