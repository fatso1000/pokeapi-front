import { ReactNode } from "react";
import { IoHeart } from "react-icons/io5";
import { IoFileTrayFull } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const LinkButton = (props: { icon: ReactNode; link: string }) => {
  return (
    <a href={props.link} className="p-2 flex items-center justify-center hover:">
      {props.icon}
    </a>
  );
};

export default function Navbar() {
  return (
    <div className="p-3 bg-[#242424] items-center justify-between w-full border-t border-t-neutral-700 h-16 inline-flex">
      <LinkButton icon={<IoHeart className="w-9 h-9" />} link="" />
      <LinkButton icon={<IoSearch className="w-9 h-9" />} link="/search" />
      <LinkButton icon={<IoFileTrayFull className="w-9 h-9" />} link="" />
    </div>
  );
}
