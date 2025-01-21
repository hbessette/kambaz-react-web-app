import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
export default function TitleControlButtons() {
  return (
    <div className="float-end">
          <GreenCheckmark/>
          <FaPlus/>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
