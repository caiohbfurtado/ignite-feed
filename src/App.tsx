import './global.css'
import styles from './App.module.css'

import { Header } from './components/Header'
import { Post, PostProps } from './components/Post'
import { Sidebar } from './components/Sidebar'

const posts: PostProps[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/caiohbfurtado.png',
      name: 'Caio Furtado',
      role: 'Mobile Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala, pessoal! 🖐🏾' },
      {
        type: 'paragraph',
        content:
          'Acabei de finalizar o primeiro módulo do treinamento em react da Rocketseat 🚀',
      },
      {
        type: 'link',
        content: 'Veja meu post!',
        url: 'https://linkedin.in/caiohbfurtado',
      },
    ],
    publishedAt: new Date('2023-08-09 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/vitorrdc.png',
      name: 'Vitor Ribeiro',
      role: 'Frontend Developer',
    },
    content: [
      { type: 'paragraph', content: 'Fala, pessoal! 🖐🏾' },
      {
        type: 'paragraph',
        content:
          'Acabei de finalizar o primeiro módulo do treinamento em react da Rocketseat 🚀',
      },
      {
        type: 'link',
        content: 'Veja meu post!',
        url: 'https://linkedin.in/caiohbfurtado',
      },
    ],
    publishedAt: new Date('2023-07-04 21:00:00'),
  },
]

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(({author, content, id, publishedAt}) => (
            <Post key={id} author={author} content={content} publishedAt={publishedAt} id={id} />
          ))}
        </main>
      </div>
    </>
  )
}

export default App
