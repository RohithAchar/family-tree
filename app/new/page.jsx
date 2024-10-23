"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewFamily } from "@/lib/action/create-family";
import { signIn, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";

const CreateFamilyPage = () => {
  const { data, status } = useSession(authOptions);
  const [formData, setFormData] = useState({
    familyName: "",
    rootPerson: {
      name: "",
      gender: "male", // Default value for gender
      dob: "",
      alive: true,
      url: "",
    },
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  const handleSubmit = async () => {
    const creatorId = data.user.email;

    try {
      const newFamily = await createNewFamily(
        formData.familyName,
        formData.rootPerson,
        creatorId
      );
      setMessage(
        `Family '${newFamily.name}' created successfully with root person '${newFamily.root.name}'!`
      );
      toast.success(
        `Family '${newFamily.name}' created successfully with root person '${newFamily.root.name}'!`
      );
      router.push(`family/${newFamily.id}`);
    } catch (error) {
      setMessage("Error creating family: " + error.message);
    }
  };

  const onUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      rootPerson: { ...prev.rootPerson, url: e.info.secure_url },
    }));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] border px-4 py-6 flex flex-col gap-6 shadow-lg rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Create new family</h3>
          <p className="text-muted-foreground">Hello</p>
        </div>
        <div className="w-full border" />
        <div className="flex flex-col gap-2">
          <div>
            <label>Family Name</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter family name"
              value={formData.familyName}
              onChange={(e) =>
                setFormData({ ...formData, familyName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Name</label>
            <input
              type="text"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter root member name"
              value={formData.rootPerson.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rootPerson: {
                    ...formData.rootPerson,
                    name: e.target.value,
                  },
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
                    {formData.rootPerson.url ? (
                      <Image
                        src={formData.rootPerson.url}
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
                checked={formData.rootPerson.gender === "male"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rootPerson: {
                      ...formData.rootPerson,
                      gender: e.target.value,
                    },
                  })
                }
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.rootPerson.gender === "female"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rootPerson: {
                      ...formData.rootPerson,
                      gender: e.target.value,
                    },
                  })
                }
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              className="block border p-2 rounded-lg w-full"
              type="date"
              value={formData.rootPerson.dob}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rootPerson: { ...formData.rootPerson, dob: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="flex items-center">
            <label>Alive</label>
            <input
              type="checkbox"
              className="ml-2 w-4 h-4"
              checked={formData.rootPerson.alive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rootPerson: {
                    ...formData.rootPerson,
                    alive: e.target.checked,
                  },
                })
              }
            />
          </div>
          <button
            className="w-full rounded-lg bg-black text-white p-2"
            onClick={handleSubmit}
          >
            Create Family
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFamilyPage;
