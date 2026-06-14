import { useState } from "react";
import "./App.css";
import { publishThread } from "./hive/publish/publishNewThread";
import { getUserPost } from "./hive/node/tester";
import { useUser } from "./context/provider";
import { MessageAlert } from "./components/alert";
import LogoThreads from "./components/logo/leo";

function App() {
  const [body, setBody] = useState<string>("");
  const [lastPermlink, setLastPermlink] = useState<string>("");
  const [lastPostUrl, setLastPostUrl] = useState<string>("");
  const [messageInfo,setMessageInfo]=useState<string>("")
  const {username,isAuthenticated,login,setUsername,language,setLanguage,t,logout}=useUser()



  async function handlePublishThread() {
    if(body.length === 0) return setMessageInfo(t("emptyThread"))
    if(body.length > 240) return setMessageInfo(t("threadLengthExceeded"))
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
        setMessageInfo(t("publishSuccess"))
      }
    } catch (err) {
      console.error(err);
      setMessageInfo(t("errorPublishing"))
    }
  }

  async function handleTest() {
    try {
      if (!username) {
        setMessageInfo(t("textUsernameAlert"))
        return;
      }

      if (!lastPermlink) {
        setMessageInfo(t("threadNotPublishYet"))
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
      setMessageInfo(t("errorGettingPublish"))
    }
  }
const handleLogin = async () => {
  const success = await login(username);

  if (!success) {
    setMessageInfo(t("loginCanceled"))
  }
};
const handleCleanMessage=()=>{
  setMessageInfo("")
}
  return (
    <div className="app">
      <LogoThreads/>
      <div className="card">
        <header className="top-options_container">
          <button
          className="language-btn"
          onClick={()=>setLanguage(prev => (prev === "en" ? "es" : "en"))}
          >{language === "es" ? "English" : "Spanish"}</button>
          <button
          style={{display:isAuthenticated === false?'none': 'block'}}
          disabled={!isAuthenticated}
          onClick={()=>logout()}
          className="logout-btn"
          >{t("logout")}</button>
        </header>
        <h1 className="title">
          InLeo Re-poster Web 3.0
        </h1>

        <span className="description">
         {t("description")}
        </span>
        {isAuthenticated === false ? 
        <>
        <div className="credentials_box">
          <input type="text"
            placeholder="Hive username" 
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
      {messageInfo === '' ? null :
      <MessageAlert
        messageInfo={messageInfo}
        cleanMessage={handleCleanMessage}
      />
      }
    </div>
  );
}

export default App;