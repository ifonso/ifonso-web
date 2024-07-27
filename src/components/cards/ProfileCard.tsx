import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <div className="w-56 relative">
      {/* Shadow */}
      <div className={`w-full h-full absolute  bg-purple rounded-xl z-10 transition-all duration-500 top-3 left-3`}
      />

      {/* Card */}
      <div className={`bg-darker p-6 border-2 border-background rounded-xl flex flex-col items-start gap-4 card-container relative z-40 transition-all duration-500`}
      >
        <div className="flex flex-col items-center">
          <motion.img
          className="w-44 h-44 aspect-square rounded-lg border-4 border-background" src="https://i.ibb.co/kq1bMTg/ifonso.webp" alt="my profile pic" />

          <motion.img
          whileHover={{
            opacity: 1,
          }}
          className="absolute w-36 mt-2 opacity-0" src="https://i.ibb.co/YkjDy5X/ifonso-logo.png" alt="" />
        </div>
        <p className="w-full font-roboto font-normal text-xs text-background">"I want to be one of the crazy ones..."</p>
        <div className="w-full font-jet font-medium text-base flex justify-between text-background">
          <p>アフォンソ</p>
          <p>2001</p>
        </div>
      </div>
    </div>
  )
}