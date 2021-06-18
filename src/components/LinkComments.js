import React, { useState } from "react";
import { getToken } from "../utils";

const LinkComments = ({ link, setShowComments, setLinks }) => {
  const [commentInput, setCommentInput] = useState("");
  const { comments, id } = link;

  const token = getToken();

  const handleCommentClick = () => {
    setShowComments(false);
  };

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          body: commentInput,
        }),
      });
      const comment = await response.json();
      const newComments = [...link.comments, comment];
      link.comments = newComments;
      setLinks((currentLinks) => {
        return currentLinks.map((l) => {
          if (l.id !== link.id) return l;
          return link;
        });
      });
      setCommentInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment__card open">
      <div className="card__open">
        <div className="comment__header" onClick={handleCommentClick}>
          Comments
        </div>
      </div>
      <div className="comment__container">
        <div className="all__comments">
          {comments &&
            comments.map((comment) => {
              return (
                <div key={comment.id} className="comment">
                  {comment.body}
                </div>
              );
            })}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={commentInput}
            onChange={handleInputChange}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

export default LinkComments;
