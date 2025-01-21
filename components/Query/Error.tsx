export { Error };

import styles from './Query.module.scss'

type RetryOptions = {
  retryQuery?: boolean;
};
type RetryFn = (options?: RetryOptions) => void;

type ErrorFallbackProps = {
  error: {
      message: string;
  } & Record<string, unknown>;
  retry: RetryFn;
  errorText: string
};

function Error({ retry, error, errorText }: ErrorFallbackProps) {
  return (
    <div className={styles["error"]}>
     {errorText}: {error.message}
      <a href="javascript: void(0)" onClick={() => retry()}>
        Retry
      </a>
    </div>
  );
}
