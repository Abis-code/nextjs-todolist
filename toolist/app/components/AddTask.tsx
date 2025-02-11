import { FaRegCalendarPlus } from "react-icons/fa";

interface AddTaskProps {
    id: string;
    text: string;
    completed: boolean;
    onDelete: (id: string) => void;
    onComplete: (id: string, completed: boolean) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ id, text, completed, onDelete, onComplete }) => {
    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleCompleteChange = () => {
        onComplete(id, !completed);
    };

    return (
        <div className="task-item">
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={handleCompleteChange} 
                className="task-checkbox"
            />
            <span className={completed ? "task-completed" : ""}>{text}</span>
            <button onClick={handleDeleteClick} className="delete-button">❌</button>
        </div>
    );
};

// Button to Add a New Task
const AddNewTaskButton: React.FC = () => {
    return (
        <div>
            <button className="btn btn-primary w-full">
                Add new Task <FaRegCalendarPlus className="ml-2" size={15} />
            </button>
        </div>
    );
};

export { AddTask, AddNewTaskButton };
