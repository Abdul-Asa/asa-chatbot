export const ChipIcon = ({ className }: { className?: string }) => {
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
        d="M5.5 1v1.5m-3 3H1m14 0h-1.5M2.5 8H1m14 0h-1.5m-11 2.5H1m14 0h-1.5m-8 3V15M8 1v1.5m0 11V15m2.5-14v1.5m0 11V15m2-12.5 1 1v9l-1 1h-9l-1-1v-9l1-1h9Z"
      />
      <path
        stroke="currentColor"
        d="M8.5 11V8.5m-3 2.5V8.5m0 0v-2l1-1h2v3m-3 0h3M10.5 5v6"
      />
    </svg>
  );
};
