import { useState } from "react";
import { publishThread } from "./hive/publish/publishNewThread";
import { getUserPost } from "./hive/node/tester";

function App() {
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [lastPermlink, setLastPermlink] = useState("");
  const [lastPostUrl,setLastPostUrl]=useState<string>("")
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

      console.log(result);

      if (result.success) {
        setLastPermlink(permlink);
        alert("Thread publicado");
      } else {
        alert(result.message || "Cancelado");
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
      const postUrl =
  `https://hive.blog/hive-167922/@${post.author}/${post.permlink}`;

      setLastPostUrl(postUrl)     
    } catch (err) {
      console.error(err);
      alert("Error obteniendo publicación");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Publicar Thread en Inleo</h2>

      <input
        placeholder="Usuario Hive"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: 300 }}
      />

      <br />
      <br />

      <textarea
  placeholder="¿Qué estás pensando?"
  value={body}
  maxLength={240}
  onChange={(e) => setBody(e.target.value)}
  rows={4}
  style={{
    width: "100%",
    maxWidth: "600px",
    padding: "12px",
    borderRadius: "12px",
    resize: "none",
    fontSize: "16px",
  }}
/>
<div
  style={{
    width: "100%",
    maxWidth: "600px",
    textAlign: "right",
    marginTop: "4px",
  }}
>
  {body.length}/240
</div>
    <div style={{columnGap:20}}>
      <button onClick={handlePublishThread}>
        Publicar Thread
      </button>

      <button onClick={handleTest}>
        Ver publicación
      </button>
    </div>
    {
      lastPostUrl === '' ? null :
    <a href={lastPostUrl} target="_blank" >
      <span>{lastPostUrl === '' ? null : lastPostUrl}</span>      
    </a>
    }
    </div>
  );
}

export default App;