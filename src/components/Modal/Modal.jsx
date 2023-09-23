import css from './Modal.module.css'
export default function Modal({url, handleCloseModal}) {
  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
  <div className={css.Modal}>
    <img src={url} alt="largeImage"  />
  </div>
</div>
  )
}
