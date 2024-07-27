import Linkedin from "../../assets/linkedin.svg";
import { ButtonProps } from "../../types/buttonProps";

export function LinkedinButton({action, ...rest}: ButtonProps) {
  return (
    <button className="transition-all duration-200 w-12 h-12 hover:bg-mint rounded-lg" onClick={action} {...rest}>
      <img className="w-full h-full" src={Linkedin} alt="github" />
    </button>
  );
};