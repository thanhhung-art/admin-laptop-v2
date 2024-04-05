interface IProps {
  w?: number;
  h?: number;
}

const CheckIcon = ({ w = 24, h = 24 }: IProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width={w + 'px'}
      height={h + 'px'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
};

export default CheckIcon;
