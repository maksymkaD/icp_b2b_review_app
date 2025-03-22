import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './idlFactory';  

const Review = () => {

  const { id } = useParams();  
  const [blockchainData, setBlockchainData] = useState(null);

  const host = window.location.href.includes("localhost") || window.location.href.includes("127.0.0.1") ? "http://127.0.0.1:4943" : "https://ic0.app";
  const agent = HttpAgent.createSync({ host: host });

  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: id.toString(),
  });

  agent.fetchRootKey().then(() => {  


    async function fetchReviews() {
      try {
        const reviews = await actor.get_reviews();
        console.log("Reviews:", reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  });

  useEffect(() => {
    fetchBlockchainData();
  });

  const fetchBlockchainData = async () => {
    await agent.fetchRootKey();
    const reviews = await actor.get_reviews();
    setBlockchainData(reviews);
  };

  return (
    <div className="feedback">
      <h2>reviews: {id}</h2>
      {blockchainData ? (
        <code>
          {JSON.stringify(
          blockchainData,
          (_, v) => (typeof v === "bigint" ? v.toString() : v),
          4 // Adds indentation for better readability
        )}
        </code>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Review;
