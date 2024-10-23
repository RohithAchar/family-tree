"use client";

import { Button } from "@/components/ui/button";
import { getFamilyByName } from "@/lib/action/get-family-name";
import { useEffect, useState } from "react";
import { Network, MoveRight } from "lucide-react";

const Home = () => {
  const [familyName, setFamilyName] = useState("");
  const [familyData, setFamilyData] = useState(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (familyName) {
        console.log("Fetching family data");
        try {
          const res = await getFamilyByName(familyName);
          setFamilyData(res);
        } catch (error) {
          console.error("Error fetching family data:", error);
        }
      }
    }, 500); // 500ms debounce delay

    // Clear timeout if `familyName` changes before the debounce is finished
    return () => clearTimeout(handler);
  }, [familyName]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[350px] border p-4 flex flex-col gap-6 shadow-lg rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Menu</h3>
          <p className="text-muted-foreground">Hello</p>
        </div>
        <div className="w-full border" />
        <Button
          className="w-full"
          size="lg"
          onClick={() => (window.location.href = "/new")}
        >
          <span>
            <Network />
          </span>
          Create New Family
        </Button>
        <div className="w-full border" />
        <div>
          <div>
            <p className="font-bold">Search Families</p>
            <input
              className="border p-2 rounded-lg w-full"
              type="text"
              placeholder="Search Families"
              onChange={(e) => setFamilyName(e.target.value)}
            />
            <div className="w-full border mt-4 mb-4" />
            <div className="mt-2 flex flex-col gap-2">
              {familyData &&
                familyData.map((family) => {
                  return (
                    <button
                      className="flex justify-between w-full border p-2 rounded-lg text-left"
                      key={family.familyId}
                      onClick={() =>
                        (window.location.href = `/family/${family.familyId}`)
                      }
                    >
                      {family.name}
                      <span className="text-muted-foreground">
                        <MoveRight />
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
