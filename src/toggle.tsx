type ToggleProps = {
    isActive: boolean;
    onClick: () => void;
    disabled: boolean;
  };
  

const Toggle: React.FC<ToggleProps> = ({ isActive, onClick, disabled}) => {
    return(
        <div className="toggle container">
            <h2 className="qheader">Question</h2>
            <button onClick={onClick} disabled={disabled} className={`toggle ${isActive ? "active" : ""}`}>
            {isActive ? "On" : "Off"}
            </button>
        </div>
    )
}

export default Toggle;
