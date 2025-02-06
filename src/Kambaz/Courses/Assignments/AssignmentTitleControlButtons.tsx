import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
export default function AssignmentTitleControlButtons() {
  return (
    <div className="float-end">
        <small className="rounded border border-black p-1 m-3">40% of Total</small>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
