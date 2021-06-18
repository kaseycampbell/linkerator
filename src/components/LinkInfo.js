import React from "react";

const LinkInfo = ({ link, setShowComments }) => {
  const handleCommentClick = () => {
    setShowComments(true);
  };

  const { title, comments, url } = link;

  //use url here instead of title. will need to trim url first
  const icon = `https://www.google.com/s2/favicons?sz=64&domain_url=${title}.com`;

  return (
    <div className="comment__card">
      <span onClick={handleCommentClick}>Comments ({comments.length})</span>
      <a className="card" href={url}>
        <div className="card__title">{title}</div>
        <div className="card__content">
          <div className="card__icon">
            <img src={icon} alt="" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default LinkInfo;
