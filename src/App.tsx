import { useState } from "react";
import "./App.css";
import { publishThread } from "./hive/publish/publishNewThread";
import { getUserPost } from "./hive/node/tester";
import { useUser } from "./context/provider";

function App() {
  const [body, setBody] = useState("");
  const [lastPermlink, setLastPermlink] = useState("");
  const [lastPostUrl, setLastPostUrl] = useState("");
  const {username,isAuthenticated,login,setUsername}=useUser()



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
        <h1 className="title">
          🚀 InLeo Re-poster Web 3.0
        </h1>

        <span className="description">
          Comparte un enlace de tu contenido original,
          añade una breve descripción y hashtags.
          Tu publicación quedará registrada en Hive
          y será accesible de forma permanente acumulando ganancias durante 7 dias.
        </span>
        {isAuthenticated === false ? 
        <>
        <div className="credentials_box">
          <input type="text" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        <button 
        onClick={()=>handleLogin()}
        className="btn btn-keychain">
            Acceder con Hive Keychain
          </button>
        </div>
        <div className="preview-box">         
        </div>
        </>
        :
        <>
        <span>@{username}</span>  
        <textarea
          className="thread-textarea"
          placeholder="¿Qué quieres compartir?"
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
            Publicar Thread
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleTest}
          >
            Ver Link
          </button>
        </div>

        {lastPostUrl && (
          <a
            href={lastPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            🔗 Abrir publicación
          </a>
        )}
        </>
      }
        

        

        
      </div>
    </div>
  );
}

export default App;