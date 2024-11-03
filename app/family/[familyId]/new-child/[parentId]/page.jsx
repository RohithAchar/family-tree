"use client";

import { useParams, useRouter } from "next/navigation";
import { createChild } from "@/lib/action/create-child";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const AddChildPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    alive: true,
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
      const parentId = params.parentId;
      const res = await createChild(
        parentId,
        formData,
        Number(localStorage.getItem("key")),
        params.familyId
      );
      if (res.status === 401) {
        toast.error("Unauthorized");
        window.location.href = "/family/" + params.familyId;
        return;
      }
      toast.success(`Child created successfully!`);
      router.push(`/family/${params.familyId}`);
    } catch (error) {
      setMessage("Error creating child: " + error.message);
    } finally {
    }
  };
  const onUpload = (e) => {
    setFormData((prev) => ({
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
            <h3 className="text-xl font-bold">Add child</h3>
            <p className="text-muted-foreground">
              Enter details to add a new child to the family tree.
            </p>
          </div>
          <div className="w-full border" />
          <div className="flex flex-col gap-4">
            <div>
              <label>Name</label>
              <input
                className="border p-2 rounded-lg w-full"
                placeholder="Enter name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
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
                      {formData.url ? (
                        <Image
                          src={formData.url}
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
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label className="ml-2" htmlFor="male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label className="ml-2" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                className="block border p-2 rounded-lg w-full"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
            </div>
            <div className="flex items-center">
              <label>Alive</label>
              <input
                className="ml-2"
                type="checkbox"
                checked={formData.alive}
                onChange={(e) =>
                  setFormData({ ...formData, alive: e.target.checked })
                }
              />
            </div>
            <button
              className="p-2 bg-black text-white rounded-lg"
              onClick={handleSubmit}
            >
              Add Child
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddChildPage;
