import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import kiming1 from './assets/kiming-1.png'
import kiming2 from './assets/kiming-2.png'
import kiming3 from './assets/kiming-3.png'
import kiming4 from './assets/kiming-4.png'
import kiming5 from './assets/kiming-5.png'
import kiming6 from './assets/kiming-6.png'
import kiming7 from './assets/kiming-7.png'
import kiming8 from './assets/kiming-8.png'

const allImages = [
  {
    img: kiming1,
    id: 1,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming2,
    id: 2,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming3,
    id: 3,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming4,
    id: 4,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming5,
    id: 5,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming6,
    id: 6,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming7,
    id: 7,
    isOpened: false,
    isReveal: false,
  },
  {
    img: kiming8,
    id: 8,
    isOpened: false,
    isReveal: false,
  },
]
const App = () => {
  // Should maintain 2 flip count at a time
  const [flipCount, setFlipCount] = useState(0)
  const [openedCards, setOpenedCards] = useState([])
  const [images, setImages] = useState(allImages)
  const [triesCount, setTriesCount] = useState(0)
  const [openedCount, setOpenedCount] = useState(0)
  
  const shuffle = (arr) => (
     arr.sort(() => (
      Math.random() - 0.5
    )
  ))

  const onRevealCard = (item) => {
    setFlipCount(flipCount + 1)
    // We need to know 
    setOpenedCards([...openedCards, item])

    // update the item
    const cardIdx = images.findIndex(a => a.index === item.index)
    let curCard = images[cardIdx]
    curCard.isReveal = true
    let updateImages = images
    updateImages.splice(cardIdx, 1, curCard)
    setImages(updateImages)
  }
    
  if (flipCount === 2) {
    const matched = openedCards[0].id === openedCards[1].id
    const pairIds = openedCards.map(a => a.index)
    const updateCards = (name, value) => {
      const cards = images.map((item) => {
        if (pairIds.includes(item.index)) {
          return {
            ...item,
            [`${name}`]: value
          }
        }
        return item
      })
      setImages(cards)
    }
    if (matched) {
        updateCards('isOpened', true)      
    } else {
      setTimeout(() => {
        updateCards('isReveal', false)
      }, 1000)
    }
    setTriesCount(triesCount + 1)
    setOpenedCount(openedCount + 1)
    
    // Reset counters
    setFlipCount(0)
    // Reset opened cards
    setOpenedCards([])
  }

  const resetGame = () => {
    setFlipCount(0)
    setOpenedCards([])
    setTriesCount(0)
    setOpenedCount(0)
    let shuffledImages = shuffle([...allImages, ...allImages])
    // Edit the images to add their idx
    shuffledImages = shuffledImages.map((item, idx) => {
      return {
        ...item,
        index: idx
      }
    })
    setImages(shuffledImages)
  }

  useEffect(() => {
    resetGame()
  }, [])

  return (
    <>
      <header>
        <h1>Cat Memory</h1>
        <button onClick={() => resetGame()}>Restart</button>
      </header>
      <div className='grid-container'>
        {images.map((item, idx) => (
          <Card
            key={idx}
            index={idx}
            card={item}
            onRevealCard={() => onRevealCard(item, idx)}
          />
        ))}
      </div>
      <h1>Tries: {triesCount}</h1>
    </>
  )
}

export default App
