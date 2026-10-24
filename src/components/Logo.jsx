export default function Logo({ className = '', wordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="11"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.22"
        />
        <path
          d="M26.4 13.1c-1.7-1.5-3.8-2.3-6.1-2.3-3.6 0-6 2-6 4.9 0 2.9 2.4 4 5.9 4.9 3.5 0.9 5.9 2 5.9 4.9 0 2.9-2.6 4.9-6.2 4.9-2.5 0-4.8-0.8-6.6-2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="30.4" cy="10.6" r="2.2" fill="var(--color-accent)" />
      </svg>
      {wordmark && (
        <span className="font-display text-[1.35rem] leading-none tracking-[0.22em]">
          Syncora
        </span>
      )}
    </span>
  );
}
