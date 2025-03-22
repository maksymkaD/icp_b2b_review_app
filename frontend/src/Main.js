import './App.css';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './components/idlFactory';

function Main() {

  const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
  const host = window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1") ? "http://127.0.0.1:4943" : "https://ic0.app";
  const agent = HttpAgent.createSync({ host: host });

  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

  const styles = {
    container: { paddingLeft: "10%", paddingRight: "10%", textAlign: "center" },
    header: { marginBottom: "20px" },
    button: { padding: "10px 20px", fontSize: "16px", cursor: "pointer" }
  };

  const [location, setLocation] = useState("");

  useEffect(() => {
    // Remove trailing slash if it exists
    const baseUrl = window.location.href.endsWith("/")
      ? window.location.href.slice(0, -1)
      : window.location.href;

    setLocation(`${baseUrl}/embed/${canisterId}`);
  }, []);

  const postReview = async (name,text) => {
    await agent.fetchRootKey();
    await actor.add_review(name,text);
  };

  return (
    <>
      <div className="main" style={styles.container}>
        <header style={styles.header}>
          <motion.h1
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            TrustChain Reviews – <span>Immutable & Secure</span>
          </motion.h1>
          <div id="icplogo" style={{ margin: "20px 0", textAlign: "center" }}>
            <img
              src="https://cryptologos.cc/logos/internet-computer-icp-logo.png"
              alt="ICP Logo"
              style={{ width: "100px", marginBottom: "10px" }}
            />
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              Powered by <a href='https://internetcomputer.org/' target="_blank" rel="noopener noreferrer">ICP</a>
            </p>
          </div>
          <p>Blockchain-powered reviews that <span>cannot</span> be edited or deleted.</p>
        </header>

        <section className='why'>
          <h2>Why TrustChain Reviews?</h2>
          <ul>
            <li>🔒 <strong>Immutable:</strong> Once posted, reviews cannot be changed.</li>
            <li>🛡️ <strong>Tamper-proof:</strong> No admin or business can modify reviews.</li>
            <li>📜 <strong>Transparent:</strong> Everything is stored on the blockchain.</li>
          </ul>
        </section>

        <section className='demo'>
          <h2>Live Demo</h2>
          <p>Enter the params: </p>
          <form onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            const author = e.target.author.value;
            const reviewText = e.target.review_text.value;
            postReview(author,reviewText);
          }}>
            <div className="field">
              <input type="text" name="author" placeholder="Author's name" required />
              <div className="line"></div>
            </div>
            <div className="field">
              <input type="text" name="review_text" placeholder="Write your review" required />
              <div className="line"></div>
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
          <p>Below is an example of how an immutable review widget would look:</p>
          <iframe
            src={location}
            title="Immutable Review Widget"
            sandbox="allow-scripts"
          ></iframe>
        </section>
      </div>
      <footer>
        <p>Interested? Get in touch to integrate <span>TrustChain</span> into your business!</p>
        <button style={styles.button} onClick={() => alert("Coming soon!")}>Contact Us</button>
      </footer>
    </>
  );
}


export default Main;
