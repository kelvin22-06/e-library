import styles from "./Loading.module.css"

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className={styles.loadingContainer} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true"></div>
      <span className={styles.loadingText}>{text}</span>
    </div>
  )
}

export default Loading
