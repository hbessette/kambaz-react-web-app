import { IoEllipsisVertical, IoTrashOutline } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
interface LessonControlButtonsProps {
    onDelete?: () => void;
}

export default function LessonControlButtons({ onDelete }: LessonControlButtonsProps) {
    return (
        <div className="float-end">
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            {onDelete && <IoTrashOutline className="fs-4" onClick={onDelete} />}
        </div>
    )
}