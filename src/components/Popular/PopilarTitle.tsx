import leftIcon from '@/assets/icons/Left-Arrow.svg';
import rightIcon from '@/assets/icons/Right-Arrow.svg';

interface PopularTitleProps {
  section: string;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
}

function PopularTitle({
  section,
  onLeftArrowClick,
  onRightArrowClick,
}: PopularTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="group">
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
          {section}
        </h2>
        <div className="h-1 w-12 bg-primary rounded-full mt-2 group-hover:w-16 transition-all duration-300"></div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLeftArrowClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
          aria-label="Previous items"
        >
          <img src={leftIcon} alt="Previous" className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={onRightArrowClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
          aria-label="Next items"
        >
          <img src={rightIcon} alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default PopularTitle;
