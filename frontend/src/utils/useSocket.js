import { useEffect } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { io } from 'socket.io-client'
import { appContext } from '../App'

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)
  const { user } = useContext(appContext)
  const [latestMessage, setLatestMessage] = useState(null)
  const [newChat, setNewChat] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const [newComment, setNewComment] = useState(null)

  useEffect(() => {
    if (socketRef.current == null)
      socketRef.current = io('http://localhost:8080')

    socketRef.current.on('connect', () => {
      console.log('Connected')
      setIsConnected(true)
    })

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected')
      setIsConnected(false)
    })

    socketRef.current.on('message', (msg) => {
      console.log(msg)
      setLatestMessage(msg)
    })

    socketRef.current.on('chatcreated', (chat) => {
      setNewChat(chat)
    })

    socketRef.current.on('createpost', (post) => {
      setNewPost(post)
    })

    socketRef.current.on('postcomment', (comment) => {
      console.log(comment)
      setNewComment(comment)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [])

  function init(id) {
    if (socketRef.current == null) return
    socketRef.current.emit('userjoin', { id })
  }

  function joinChat(chatId) {
    if (socketRef.current == null) return
    socketRef.current.emit('chatjoin', { chatId })
  }

  function sendMessage(chatId, text, user) {
    if (socketRef.current == null) return
    socketRef.current.emit('messagesend', { chatId, text, user })
  }

  function createChat(data) {
    if (socketRef.current == null) return
    socketRef.current.emit('createchat', data)
  }

  function createPost(data, user) {
    if (socketRef.current == null) return
    socketRef.current.emit('createpost', { data, user })
  }

  function openPost(postId) {
    if (socketRef.current == null) return
    socketRef.current.emit('openpost', postId)
  }

  function createComment(comment, user, postId) {
    if (socketRef.current == null) return
    socketRef.current.emit('postcomment', { comment, user, postId })
  }

  return {
    isConnected,
    socketRef,
    joinChat,
    sendMessage,
    latestMessage,
    init,
    newChat,
    createChat,
    newPost,
    createPost,
    openPost,
    createComment,
    newComment,
  }
}
