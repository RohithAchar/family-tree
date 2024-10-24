"use client";

import verifyUser from "@/lib/action/verify-user";
import { extractFirstUUID } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const KeyModal = () => {
  const [key, setKey] = useState("");

  const handleClick = () => {
    if (!key) {
      setError("Key is required");
      return;
    }
    const url = window.location.href;
    const firstUUID = extractFirstUUID(url);
    const verify = async () => {
      try {
        const family = await verifyUser(Number(key), firstUUID);
        toast.success("Access granted!");
        localStorage.setItem("key", key);
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    };

    verify();
  };

  return (
    <div className="h-screen w-screen  flex items-center justify-center">
      <div className="w-[350px] border px-4 py-6 flex flex-col gap-6 shadow-lg rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Verify</h3>
          <p className="text-muted-foreground">Verify that you have access.</p>
        </div>
        <div className="w-full border" />
        <div>
          <label htmlFor="key">Key</label>
          <input
            className="p-2 rounded-lg w-full border"
            type="number"
            placeholder="Enter key to unlock"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleClick}
          className="p-2 bg-black text-white rounded-lg"
        >
          Unlock
        </button>
        <Link
          className="text-xs hover:underline underline-offset-4 text-center text-blue-600"
          href="/new"
        >
          Create new family
        </Link>
      </div>
    </div>
  );
};

export default KeyModal;
