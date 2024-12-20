"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { addSpouse } from "@/lib/action/create-spouse";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";

const AddSpouseForm = () => {
  const [spouseData, setSpouseData] = useState({
    name: "",
    gender: "female", // Default to female
    dob: "",
    alive: true,
    familyId: "", // Optional if needed
    url: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async () => {
    try {
      const personId = params.spouseId;
      const res = await addSpouse(
        personId,
        spouseData,
        Number(localStorage.getItem("key")),
        params.familyId
      );
      if (res.status === 401) {
        toast.error("Unauthorized");
        window.location.href = "/family/" + params.familyId;
        return;
      }
      toast.success("Spouse added successfully!");
      setMessage(`Spouse added successfully!`);
      router.push(`/family/${params.familyId}`);
    } catch (error) {
      setMessage(`Error adding spouse: ${error.message}`);
      toast.error("Error adding spouse: " + error.message);
    }
  };
  const onUpload = (e) => {
    setSpouseData((prev) => ({
      ...prev,
      url: e.info.secure_url,
    }));
  };

  if (!isMounted) {
    return null;
  }
  if (localStorage.getItem("key") == null) {
    window.location.href = "/family/" + params.familyId;
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[350px] border px-4 py-6 flex flex-col gap-6 shadow-lg rounded-lg">
          <div>
            <h3 className="text-xl font-bold">Add spouse</h3>
            <p className="text-muted-foreground">
              Enter details to add a spouse to this family member.
            </p>
          </div>
          <div className="w-full border" />
          <div className="flex flex-col gap-2">
            <div>
              <label>Spouse Name</label>
              <input
                className="border p-2 rounded-lg w-full"
                placeholder="Enter name"
                type="text"
                value={spouseData.name}
                onChange={(e) =>
                  setSpouseData({ ...spouseData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Phone number</label>
              <input
                className="border p-2 rounded-lg w-full"
                placeholder="Enter phone number"
                type="tel"
                value={spouseData.phoneNumber}
                onChange={(e) =>
                  setSpouseData({ ...spouseData, phoneNumber: e.target.value })
                }
                required
              />
            </div>
            <CldUploadWidget
              uploadPreset="u9zu1wyh"
              onSuccess={onUpload}
              options={{
                cropping: true, // Enable cropping
                croppingAspectRatio: 1, // Enforce square aspect ratio
                multiple: false, // Only one image allowed
                clientAllowedFormats: ["png", "jpeg"],
                transformation: [
                  { width: 52, height: 52, crop: "crop", gravity: "face" }, // Use "crop" to enforce the exact dimensions
                ],
              }}
            >
              {({ open }) => {
                return (
                  <div className="flex gap-2">
                    <button
                      className="p-2 w-full border rounded-lg"
                      onClick={() => open()}
                    >
                      Upload an Image
                    </button>
                    <div className="relative">
                      {spouseData.url ? (
                        <Image
                          src={spouseData.url}
                          alt="Profile"
                          width={52}
                          height={52}
                          className="rounded-full" // Optional: Add this for a circular image
                        />
                      ) : (
                        <div className="w-[52px] h-[52px] rounded-full border"></div>
                      )}
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
            <div>
              <label>Gender</label>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={spouseData.gender === "female"}
                  onChange={(e) =>
                    setSpouseData({ ...spouseData, gender: e.target.value })
                  }
                />
                <label className="ml-2" htmlFor="female">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={spouseData.gender === "male"}
                  onChange={(e) =>
                    setSpouseData({ ...spouseData, gender: e.target.value })
                  }
                />
                <label className="ml-2" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="mt-2">
                <label>Date of Birth</label>
                <input
                  className="block border p-2 rounded-lg w-full"
                  type="date"
                  value={spouseData.dob}
                  onChange={(e) =>
                    setSpouseData({ ...spouseData, dob: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mt-2">
                <label>Alive</label>
                <input
                  className="ml-2"
                  type="checkbox"
                  checked={spouseData.alive}
                  onChange={(e) =>
                    setSpouseData({ ...spouseData, alive: e.target.checked })
                  }
                />
              </div>
              <button
                onClick={handleSubmit}
                className="mt-2 w-full rounded-lg bg-black text-white p-2"
              >
                Add Spouse
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSpouseForm;
