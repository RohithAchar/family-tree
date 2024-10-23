"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewFamily } from "@/lib/action/create-family";
import { signIn, useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

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
      console.log(data);
      signIn();
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = data.user.email;
    console.log(creatorId);

    try {
      const newFamily = await createNewFamily(
        formData.familyName,
        formData.rootPerson,
        creatorId
      );
      setMessage(
        `Family '${newFamily.name}' created successfully with root person '${newFamily.root.name}'!`
      );
      router.push(`family/${newFamily.id}`);
    } catch (error) {
      setMessage("Error creating family: " + error.message);
    }
  };

  const onUpload = (e) => {
    console.log("onUpload: ", e.info.secure_url);
    setFormData((prev) => ({
      ...prev,
      rootPerson: { ...prev.rootPerson, url: e.info.secure_url },
    }));
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[350px] border p-4 flex flex-col gap-6 shadow-lg rounded-lg">
          <div>
            <h3 className="text-xl font-bold">Create new family</h3>
            <p className="text-muted-foreground">Hello</p>
          </div>
          <CldUploadWidget
            uploadPreset="u9zu1wyh"
            onSuccess={onUpload}
            options={{
              cropping: true, // Enable cropping
              croppingAspectRatio: 1, // Enforce square aspect ratio
              multiple: false, // Only one image allowed
              // The following options ensure that the cropped part is what's uploaded
              clientAllowedFormats: ["png", "jpeg"],
              transformation: [
                { width: 52, height: 52, crop: "limit", gravity: "face" }, // Crop to 52x52, focus on the face
              ],
            }}
          >
            {({ open }) => {
              return (
                <div className="flex gap-2">
                  <button
                    className="p-2 w-full bg-black rounded-lg text-white"
                    onClick={() => open()}
                  >
                    Upload an Image
                  </button>
                  <div className="">
                    {formData.rootPerson.url ? (
                      <Image
                        src={formData.rootPerson.url}
                        alt="Profile"
                        x="0"
                        y="0"
                        width="52"
                        height="52"
                      />
                    ) : (
                      <div className="w-[48px] h-[48px] rounded-full border"></div>
                    )}
                  </div>
                </div>
              );
            }}
          </CldUploadWidget>
          <div className="w-full border" />
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Family Name</label>
            <input
              type="text"
              value={formData.familyName}
              onChange={(e) =>
                setFormData({ ...formData, familyName: e.target.value })
              }
              required
            />
          </div>
          <h2>Root Person Details</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={formData.rootPerson.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rootPerson: { ...formData.rootPerson, name: e.target.value },
                })
              }
              required
            />
          </div>
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
          <div>
            <label>Alive</label>
            <input
              type="checkbox"
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
          <button type="submit">Create Family</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default CreateFamilyPage;
