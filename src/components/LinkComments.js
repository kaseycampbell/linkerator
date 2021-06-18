import React, {useState} from "react";

const LinkComments = ({ link, setShowComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const { comments, id } = link;

  const handleCommentClick = () => {
    console.log("comments closed");
    setShowComments(false);
  };

  const handleInputChange = (e) => {
    setCommentInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentInput('');
    try {
      const response = await fetch(`/api/comments/${id}`, {
        
      })
      const comment = await response.json();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="comment__card open">
        <div className="card__open">
          <div className="comment__header" onClick={handleCommentClick}>Comments</div>
        </div>
        <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Add a comment"
          value={commentInput}
          onChange={handleInputChange}/>
          <button>Add</button>
          </form>
      </div>
    </div>
  );
};

export default LinkComments;
