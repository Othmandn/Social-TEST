import React, { useState, useEffect, useRef } from "react";
import iconPoubelle from "../images/poubelle.png";
import iconEdit from "../images/modifier.png";
import imageBeach from "../images/beach.jpg";
import PhotoProfil from "../images/sans-visage.png";
import "../styles/components/Post.css";

const Post = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleButtonClick = () => {
    setShowDiv(!showDiv);
  };
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        hidePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hidePopup = () => {
    setShowDiv(false);
  };

  const handleLike = () => {
    if (countLike === 0) {
      setCountLike(1);
    } else {
      setCountLike(0);
    }
  };

  let toggleClassHeart = countLike === 1 ? "-active" : "";

  const handleInputClick = () => {
    setShowComments(true);
  };

  return (
    <div className="post-content">
      <div className="post">
        <div className="post-info">
          <div className="post-user-info">
            <img src="" alt="" />
            <p>Username</p>
          </div>

          <div className="edit-post">
            <p>Il y a 2 minutes</p>
            <button
              className="edit-button"
              onClick={handleButtonClick}
              style={{
                backgroundColor: showDiv ? "#D9D9D9" : "transparent",
              }}
            >
              ...
            </button>
            {showDiv && (
              <div className="popup" ref={popupRef}>
                <button onClick={hidePopup}>
                  <img src={iconEdit} alt="img icon" />
                  Modifier
                </button>
                <button onClick={hidePopup}>
                  <img src={iconPoubelle} alt="img icon" />
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="post-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et cumque
            reiciendis corrupti veritatis impedit maxime, consequuntur
            reprehenderit, ullam minus consequatur quas, nostrum nulla
            provident. Alias maiores consequatur voluptate sint a.
          </p>
          <img src={imageBeach} alt="" />
        </div>

        <div className="post-comment">
          <div className="comment">
            <div>
              <img src={PhotoProfil} alt="" />
            </div>

            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              className="post-comment-input"
              onClick={handleInputClick}
            />

            <div className="coeur">
              <div className={`heart${toggleClassHeart}`} onClick={handleLike}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="-15 -8 550 550"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </div>
              70
            </div>

            <div className="commentaire">
              <div className="comms" onClick={handleInputClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="2em"
                  viewBox="-15 -10 550 550"
                >
                  <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                </svg>
              </div>
              34
            </div>
          </div>
        </div>

        <div className={`display-comments${showComments ? "" : " hidden"}`}>
          <span></span>
          <div className="display-comments-content">
            <div>
              <img src="" alt="" />
            </div>
            <div className="display-comments-comms">
              <p>Username</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                magnam.
              </p>
            </div>
          </div>

          <div className="display-comments-content">
            <div>
              <img src="" alt="" />
            </div>
            <div className="display-comments-comms">
              <p>Username</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
