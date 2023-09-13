import { ChangeEvent, FormEvent,  useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

type Author = {
  avatarUrl: string;
  role: string;
  name: string
}

type ContentParagraph = {
  type: 'paragraph'
  content: string
}

type ContentLink = {
  type: 'link'
  content: string
  url: string
}

export type PostProps = {
  id: number
  author: Author
  publishedAt: Date
  content: Array<ContentParagraph | ContentLink>
}

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    { id: 1, content: 'Post muito bacana, hein?!' },
  ])
  const [newCommentText, setNewCommentText] = useState('')
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR },
  )

  const isNewCommentEmpty = newCommentText.trim().length === 0

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault()

    if (isNewCommentEmpty) {
      return
    }

    setComments((prevState) => [
      ...prevState,
      { id: prevState.length, content: newCommentText },
    ])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleDeleteComment(id: number) {
    setComments((prevState) => prevState.filter((comment) => comment.id !== id))
  }

  return (
    <article className={styles.container}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) =>
          line?.type === 'link' ? (
            <p key={line.content}>
              <a href={line.url}>{line?.content}</a>
            </p>
          ) : (
            <p key={line.content}>{line?.content}</p>
          ),
        )}
      </div>

      <form onSubmit={handleSubmitForm}>
        <label htmlFor="comment">Deixe seu feedback</label>
        <textarea
          name="comment"
          id="comment"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          placeholder="Escreva um comentário..."
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            content={comment.content}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
    </article>
  )
}
