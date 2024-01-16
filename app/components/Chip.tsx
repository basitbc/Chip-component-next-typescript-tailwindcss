import React from 'react';

interface ChipProps {
    label: string;
    onRemove: () => void;
    highlighted: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, highlighted }) => {
    const firstLetter = label.charAt(0).toUpperCase();

    const circleBackground = highlighted ? 'bg-blue-500 text-white' : 'bg-white text-blue-500';

    return (
        <div className={`m-1 p-1.5 ${highlighted ? 'bg-gray-300' : 'bg-blue-500'} text-white rounded-full flex items-center`}>
            {/* Circular element with first letter */}
            <div className={`rounded-full w-6 h-6 flex items-center justify-center mr-2 font-bold ${circleBackground}`}>
                {firstLetter}
            </div>

            {/* Chip label */}
            <span className="mr-2 text-sm">{label}</span>

            {/* Remove button */}
            <button onClick={onRemove} className="text-gray text-xs focus:outline-none">
                X
            </button>
        </div>
    );
};

export default Chip;
