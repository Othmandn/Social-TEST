import React from "react";
import "../styles/Home.css";
import PhotoProfil from "../images/sans-visage.png";
import iconIMG from "../images/image.png";
import iconVideo from "../images/video.png";

import logo from "../images/2.svg";
import Post from "../components/Post";

const Home = () => {
  return (
    <div className="container">
      <header>
        <div className="header-logo">
          <img src={logo} alt="logo-groupomania" />
        </div>

        <div className="header-search">
          <form>
            <i className="fa-solid fa-magnifying-glass search-btn"></i>
            <input
              type="text"
              placeholder="Recherche..."
              className="header-input"
            />
          </form>

          <div className="user-info">
            <img src={PhotoProfil} alt="profil" />
            <p>UserName</p>
          </div>

          <i className="fa fa-arrow-right-from-bracket logout-btn"></i>
        </div>
      </header>

      <aside>
        <div className="aside-content">
          <h2>Friends</h2>

          <div className="aside-user">
            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>

            <div className="aside-friends">
              <img src="" alt="" />
              <p>Username</p>
            </div>
          </div>
        </div>
      </aside>

      <main>
        <div className="main-form">
          <form>
            <div className="main-post">
              <div>
                <img src={PhotoProfil} alt="" />
              </div>

              <textarea placeholder="Quoi de neuf Username?"></textarea>
            </div>

            <div className="main-file">
              <button type="button" className="button-4">
                <img src={iconIMG} alt="img icon" />
                Image
              </button>

              <button type="button" className="button-4">
                <img src={iconVideo} alt="img icon" />
                Vidéo
              </button>
            </div>
          </form>
        </div>

        <Post />
        <Post />
        <Post />
      </main>

      <article>
        <div className="article-content">
          <div className="article-content-user">
            <div className="article-content-user-info">
              <img src={PhotoProfil} alt="" />
              <p>UserName</p>
            </div>
          </div>

          <div className="article-content-follow">
            <div className="article-content-score">
              <div className="articlescore">
                <span>10</span>
                <p>Followers</p>
              </div>

              <div className="articlescore">
                <span>2</span>
                <p>Following</p>
              </div>
            </div>
            <div className="separation"></div>
            <p>Mon Profile</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Home;
