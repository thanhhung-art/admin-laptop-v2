interface IProps {
  w?: number;
  h?: number;
}

const ArrowUpIcon = ({ w = 40, h = 40 }: IProps) => {
  return (
    <svg
      width={`${w}px`}
      height={`${h}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V18M12 6L7 11M12 6L17 11"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpIcon;
