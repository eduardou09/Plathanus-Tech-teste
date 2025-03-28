const Button = ({
    title,
    width,
    padding = "py-1",
    onClick,
    disabled,
    radius = "rounded-[5px]",
    className,
  }) => {
    return (
      <button
        type="button"
        className={`${width} ${padding} bg-button hover:bg-[#5ddd99] text-black flex justify-center font-semibold bg-full px-8 rounded-[12px]  items-center  py-2 max-md:text-lg ${radius} ${className} cursor-pointer`}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </button>
    );
  };
  
  export default Button;
  