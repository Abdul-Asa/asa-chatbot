export const WindowIcon = ({ className }: { className?: string }) => {
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
        d="M14.5 9V5.5h-13v9H9M1.5 5.5v-4h13v4h-13ZM3 3.5h1M5 3.5h1M7 3.5h1"
      />
      <path
        fill="currentColor"
        d="m12 8.5.99 2.51 2.51.99-2.51.99L12 15.5l-.99-2.51L8.5 12l2.51-.99L12 8.5ZM8 7l.566 1.434L10 9l-1.434.566L8 11l-.566-1.434L6 9l1.434-.566L8 7Z"
      />
    </svg>
  );
};
