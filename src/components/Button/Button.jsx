import css from './Button.module.css'
export function Button({onClick}) {
  return (
    <button type='button' className={css.Button} onClick={onClick}>Load more</button>
  )
}
