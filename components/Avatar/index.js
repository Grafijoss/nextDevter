import styles from './styles.module.css'

export default function Avatar({ alt, src }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} />
      <strong>{alt}</strong>
    </div>
  )
}
