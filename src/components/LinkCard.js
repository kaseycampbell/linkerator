import React, { useState } from "react";
import "../css/LinkCard.css";
import {LinkInfo, LinkComments} from './index'

//if showComments is true, return div.card, div.comment__container, div.comment__title, div.comment__input with add button
//else, return regular card

const LinkCard = ({ link }) => { 
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="card__container">
    { showComments ? 
    <LinkComments link={link} setShowComments={setShowComments}/>
    : <LinkInfo link={link} setShowComments={setShowComments}/>
    }
    </div>
  );
};

export default LinkCard;


{/* <div className="card__comments" onClick={handleCommentClick}>
              Comments ({comments.length})
            </div> */}