export const ChatIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path stroke="currentColor" d="M1.5 14.5v-12h13v10h-11l-2 2Z" />
      <path
        fill="currentColor"
        d="m8 4 .99 2.51 2.51.99-2.51.99L8 11l-.99-2.51L4.5 7.5l2.51-.99L8 4Z"
      />
    </svg>
  );
};
