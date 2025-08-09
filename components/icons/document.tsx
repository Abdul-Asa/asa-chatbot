export const DocumentIcon = ({ className }: { className?: string }) => {
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
        d="M7 13.5H1.5v-12H10L11.5 3v3M4 4.5h5M4 6.5h4"
      />
      <path
        fill="currentColor"
        d="m11.5 8 .99 2.51 2.51.99-2.51.99L11.5 15l-.99-2.51L8 11.5l2.51-.99L11.5 8Z"
      />
    </svg>
  );
};
