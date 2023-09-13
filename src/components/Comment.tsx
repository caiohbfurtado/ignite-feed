import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'
import { ThumbsUp, Trash } from '@phosphor-icons/react'

type Props ={
  content: string
  onDelete: () => void
}

export function Comment({ content, onDelete }: Props) {
  const [likes, setLikes] = useState(0)

  function handleLiked() {
    setLikes((prevState) => prevState + 1)
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/caiohbfurtado.png" />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <strong>
            Caio Furtado <span>(você)</span>
          </strong>
          <time title="11 de maio às 08:13h" dateTime="2023-05-11 08:13:52">
            Cerca de 2h atrás
          </time>

          <p className={styles.paragraph}>{content}</p>

          <button title="Deletar comentário" onClick={onDelete}>
            <Trash size={24} />
          </button>
        </div>

        <button className={styles.likes} onClick={handleLiked}>
          <ThumbsUp size={20} />
          Aplaudir • {likes}
        </button>
      </div>
    </div>
  )
}
