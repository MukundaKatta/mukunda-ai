import { useState, useEffect } from 'react'

export function TypeWriter({ words, className = '' }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const speed = deleting ? 40 : 80

    if (!deleting && text === word) {
      const timeout = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      {text}
      <span className="cursor-blink text-teal-600">|</span>
    </span>
  )
}
