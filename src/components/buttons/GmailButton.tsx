import { Mail } from "lucide-react";
import { ButtonProps } from "../../types/buttonProps";

export function GmailButton({action, ...rest}: ButtonProps) {
  return (
    <button className="transition-all duration-200 h-12 px-4 flex justify-center items-center gap-3 bg-purple border-primary border-2 rounded-lg hover:bg-mint" onClick={action} {...rest}>
      <Mail size={24} className="text-primary"/>
      <p className="font-jet font-medium text-xs text-primary">GET IN TOUCH</p>
    </button>
  );
};