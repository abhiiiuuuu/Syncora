const LETTERS = ['S', 'y', 'n', 'c', 'o', 'r', 'a'];

/**
 * The Syncora mark.
 *
 * The default is the glass capsule: a frosted tile holding the S monogram and
 * a letter-by-letter wordmark that assembles itself on first paint. The footer
 * uses the same object without the entrance, so the identity stays consistent
 * without replaying the animation on every repeat visit.
 */
export default function Logo({ className = '', wordmark = true, animated = false }) {
  return (
    <span className={`inline-flex ${className}`}>
      <span
        className={`glass-mark inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 ${
          animated ? 'is-entering' : ''
        }`}
      >
        <span className="glass-mark__sheen" aria-hidden="true" />

        <span className="glass-mark__tile relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
          <svg
            viewBox="0 0 40 40"
            className="h-5 w-5"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M26.4 13.1c-1.7-1.5-3.8-2.3-6.1-2.3-3.6 0-6 2-6 4.9 0 2.9 2.4 4 5.9 4.9 3.5 0.9 5.9 2 5.9 4.9 0 2.9-2.6 4.9-6.2 4.9-2.5 0-4.8-0.8-6.6-2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="30.4" cy="10.6" r="2.4" fill="var(--color-accent)" />
          </svg>
        </span>

        {wordmark && (
          <span className="glass-wordmark relative z-[1]" aria-hidden="true">
            {LETTERS.map((letter, index) => (
              <span key={`${letter}-${index}`} style={{ '--i': index }}>
                {letter}
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="sr-only">Syncora</span>
    </span>
  );
}
