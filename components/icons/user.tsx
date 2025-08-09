export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke="currentColor"
        d="M2.359 11.638 1.5 14.5h13l-.859-2.862A3 3 0 0 0 10.768 9.5H5.232a3 3 0 0 0-2.873 2.138Z"
      />
      <circle cx="8" cy="4.5" r="3" stroke="currentColor" />
    </svg>
  );
};
