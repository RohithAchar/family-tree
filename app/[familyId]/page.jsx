"use client";

import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

import CustomNode from "./components/custome-node";
import CurvyLink from "./components/curvy-line";
import { getFamilyMembers } from "@/action/get-family";
import { useParams, useRouter } from "next/navigation";

export default function App() {
  const [treeData, setTreeData] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      const familyId = params.familyId; // Replace with your actual family ID
      try {
        const data = await getFamilyMembers(familyId);
        setTreeData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFamilyMembers();
  }, []);

  const FamilyTree = ({ data }) => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <Tree
          data={data}
          orientation="vertical"
          pathFunc="step"
          renderCustomNodeElement={CustomNode}
          linkComponent={CurvyLink}
          separation={{ siblings: 3.5, nonSiblings: 2 }}
          translate={{ x: window.innerWidth / 2, y: 200 }}
        />
      </div>
    );
  };

  if (!isMounted) return null;

  if (!treeData) {
    return <button onClick={() => handleAddChild()}>Add Root</button>;
  }

  return <FamilyTree data={treeData} />;
}
