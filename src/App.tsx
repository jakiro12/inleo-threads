import { useState } from "react";
import "./App.css";
import { publishThread } from "./hive/publish/publishNewThread";
import { getUserPost } from "./hive/node/tester";
import { useUser } from "./context/provider";

function App() {
  const [body, setBody] = useState("");
  const [lastPermlink, setLastPermlink] = useState("");
  const [lastPostUrl, setLastPostUrl] = useState("");
  const {username,isAuthenticated,login,setUsername,language,setLanguage,t,logout}=useUser()



  async function handlePublishThread() {
    try {
      const permlink = `re-leothreads-${Date.now()}`;

      const result = await publishThread(
        username,
        body,
        permlink,
        "leothreads",
        "leothread-2026-06-01-14-26"
      );

      if (result.success) {
        setLastPermlink(permlink);
        alert("Thread publicado");
      }
    } catch (err) {
      console.error(err);
      alert("Error publicando");
    }
  }

  async function handleTest() {
    try {
      if (!username) {
        alert("Ingresa un usuario");
        return;
      }

      if (!lastPermlink) {
        alert("Todavía no publicaste ningún thread");
        return;
      }

      const post = await getUserPost(
        username,
        lastPermlink
      );

      const postUrl = `https://hive.blog/hive-167922/@${post.author}/${post.permlink}`;

      setLastPostUrl(postUrl);
    } catch (err) {
      console.error(err);
      alert("Error obteniendo publicación");
    }
  }
const handleLogin = async () => {
  const success = await login(username);

  if (!success) {
    alert("Login cancelado");
  }
};
  return (
    <div className="app">
      <div className="card">
        <header className="top-options_container">
          <button
          className="language-btn"
          onClick={()=>setLanguage(prev => (prev === "en" ? "es" : "en"))}
          >{language === "es" ? "English" : "Spanish"}</button>
          <button
          onClick={()=>logout()}
          className="logout-btn"
          >{t("logout")}</button>
        </header>
        <h1 className="title">
          🚀 InLeo Re-poster Web 3.0
        </h1>

        <span className="description">
         {t("description")}
        </span>
        {isAuthenticated === false ? 
        <>
        <div className="credentials_box">
          <input type="text"
            placeholder="text your hive username" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        <button 
        onClick={()=>handleLogin()}
        className="btn btn-keychain">
            {t("login")}
          </button>
        </div>
        <div className="preview-box">         
        </div>
        </>
        :
        <>
        <span className="username_text">@{username}</span>  
        <textarea
          className="thread-textarea"
          placeholder={t("placheHolderInfo")}
          value={body}
          maxLength={240}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="counter">
          {body.length}/240
        </div>

        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={handlePublishThread}
          >
            {t("publish")}
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleTest}
          >
            {t("showLink")}            
          </button>
        </div>

        {lastPostUrl && (
          <a
            href={lastPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            🔗 {t("openLink")}
          </a>
        )}
        </>
      }
        

        

        
      </div>
    </div>
  );
}

export default App;