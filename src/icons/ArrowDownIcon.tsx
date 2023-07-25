interface IProps {
  w?: number;
  h?: number;
}

const ArrowDownIcon = ({ w = 40, h = 40 }: IProps) => {
  return (
    <svg
      width={`${w}px`}
      height={`${h}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V18M12 18L7 13M12 18L17 13"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
