"use client";

import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

import CustomNode from "./components/custome-node";
import CurvyLink from "./components/curvy-line";
import { getFamilyMembers } from "@/lib/action/get-family";
import { useParams, useRouter } from "next/navigation";
import { Info, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import KeyModal from "@/components/ui/key-modal";
import { extractFirstUUID } from "@/lib/utils";
import verifyUser from "@/lib/action/verify-user";

export default function App() {
  const [treeData, setTreeData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const url = window.location.href;
    const firstUUID = extractFirstUUID(url);
    const verify = async () => {
      try {
        const family = await verifyUser(
          Number(localStorage.getItem("key")),
          firstUUID
        );
        setIsAuthorized(true);
        router.refresh();
      } catch (error) {
        toast.error(error.message);
      }
    };

    verify();
  }, []);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      const familyId = params.familyId; // Replace with your actual family ID
      try {
        setLoading(true);
        const data = await getFamilyMembers(familyId);
        setTreeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyMembers();
  }, [params.familyId]);

  if (!isMounted) return null;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (localStorage.getItem("key") == null || !isAuthorized) {
    return <KeyModal />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const FamilyTree = ({ data }) => {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <Tree
          data={data}
          orientation="vertical"
          pathFunc="step"
          renderCustomNodeElement={CustomNode}
          linkComponent={CurvyLink}
          separation={{ siblings: 3.5, nonSiblings: 3 }}
          translate={{ x: window.innerWidth / 2, y: 200 }}
        />
      </div>
    );
  };

  if (!isMounted) return null;

  if (!treeData) {
    return;
  }

  return (
    <>
      <div className="absolute top-[35%] right-4 p-2 flex flex-col gap-2">
        <button
          className="p-2 rounded-lg bg-[#f3f4f6]"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Copied to clipboard");
          }}
        >
          <Share2 />
        </button>
        <button className="p-2 rounded-lg bg-[#f3f4f6]">
          <Info />
        </button>
      </div>
      <FamilyTree data={treeData} />
    </>
  );
}
