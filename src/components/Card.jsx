import { useState } from "react"

const Card = ({ card, onRevealCard, index }) => {
  return (
    // <div className={`grid-item ${count%2 == 0 ? 'done' : 'hidden'}`}>
    <div
      id={index}
      className={`grid-item ${card.isReveal ? 'reveal' : ''} ${card.isOpened ? 'opened' : ''}`}
      onClick={() => onRevealCard()}
    >         
      <div className='front'></div>
      <div className='back'>          
        <img src={card.img} alt='' />
      </div>
    </div>
  )
}

export default Card