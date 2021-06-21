import React, { useState } from "react";
import "../css/LinkCard.css";
import { LinkInfo, LinkComments } from "./index";

const LinkCard = ({ link, setLinks }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="card__container">
      {showComments ? (
        <LinkComments
          link={link}
          setShowComments={setShowComments}
          setLinks={setLinks}
        />
      ) : (
        <LinkInfo link={link} setShowComments={setShowComments} />
      )}
    </div>
  );
};

export default LinkCard;
