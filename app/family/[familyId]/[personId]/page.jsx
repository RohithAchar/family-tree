"use client";

import { useState, useEffect } from "react";
import { getPerson } from "@/lib/action/get-person";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { extractFirstUUID } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function UpdatePersonForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    alive: true,
    url: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch the person's data on component mount
  useEffect(() => {
    async function fetchPerson() {
      try {
        const person = await getPerson(params.personId);
        //
        const url = window.location.href;
        const firstUUID = extractFirstUUID(url);
        //
        setFormData({
          name: person.name,
          gender: person.gender,
          dob: person.dob,
          alive: person.alive,
          url: person.url,
          phoneNumber: person.phoneNumber,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchPerson();
  }, [params.personId]);

  if (!isMounted) {
    return null;
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-2xl text-blue-500 mr-2" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (localStorage.getItem("key") == null) {
    window.location.href = "/family/" + params.familyId;
  }

  return (
    <>
      <div className="text-center flex h-screen items-center justify-center">
        <div
          className={`relative w-[350px] border px-4 py-6 flex flex-col gap-2 shadow-lg rounded-lg ${
            formData.gender === "male" ? "bg-[#f5f5ff]" : "bg-[#fff8ff]"
          }`}
        >
          <div
            className={`mx-auto relative flex justify-center items-center w-[120px] h-[120px] rounded-full overflow-hidden shadow-lg ${
              formData.gender === "male" ? "bg-[#d7d7ff]" : "bg-[#ffdef9]"
            }`}
          >
            <Image
              className="rounded-full"
              width={100}
              height={100}
              src={formData.url}
            />
          </div>
          <h3 className="text-2xl font-bold">{formData.name}</h3>
          <div
            className={`font-semibold py-2 rounded-lg ${
              formData.gender === "male" ? "bg-[#eaeaff]" : "bg-[#ffebfb]"
            }`}
          >
            {formData.dob}
          </div>
          <div
            className={`font-semibold py-2 rounded-lg ${
              formData.gender === "male" ? "bg-[#eaeaff]" : "bg-[#ffebfb]"
            }`}
          >
            {formData.phoneNumber}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                window.location.href = `/family/${params.familyId}`;
              }}
              className="border-2 rounded-lg p-2 w-full"
            >
              Back
            </button>
            <button
              className="border rounded-lg p-2 w-full bg-black text-white"
              onClick={() => router.push(`${window.location.href}/edit`)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
