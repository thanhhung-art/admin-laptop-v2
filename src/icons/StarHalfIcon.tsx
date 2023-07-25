interface IProps {
  w?: number;
  h?: number;
}

const StarHalfIcon = ({ w = 15, h = 15 }: IProps) => {
  return (
    <svg
      width={`${w}px`}
      height={`${h}px`}
      viewBox="-4.5 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>star_favorite_half [#1501]</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-419.000000, -280.000000)"
          fill="#000000"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M374,120 L374,137.714 C374,137.714 373.571353,137.786 373.269101,137.93 L369.638788,139.779 C369.321149,139.931 368.99252,140 368.673782,140 C367.465876,140 366.399753,139.01 366.629464,137.791 L367.365858,133.876 C367.481263,133.264 367.254849,132.64 366.766851,132.206 L363.63223,129.433 C362.402341,128.342 363.066195,126.441 364.766496,126.217 L369.058465,125.645 C369.73331,125.556 370.258678,125.17 370.55983,124.614 L372.375536,121.051 C372.755824,120.35 372.900904,120 374,120"
              id="star_favorite_half-[#1501]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default StarHalfIcon;
