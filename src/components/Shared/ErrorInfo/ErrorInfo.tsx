import styles from './ErrorInfo.module.css';

const ErrorInfo: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={styles.container}>
      <p>Sorry, something went wrong:</p>
      <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message}</pre>
    </div>
  );
};

export default ErrorInfo;
