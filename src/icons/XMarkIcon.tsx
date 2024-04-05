interface IProps {
  w?: number;
  h?: number;
}
const XMarkIcon = ({ w = 24, h = 24 }: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 24 24`}
      strokeWidth={1.5}
      stroke="currentColor"
      width={w + "px"}
      height={h + "px"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};

export default XMarkIcon;
