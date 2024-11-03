"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createNewFamily } from "@/lib/action/create-family";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const CreateFamilyPage = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    key: "",
    rootPerson: {
      name: "",
      gender: "male", // Default value for gender
      dob: "",
      alive: true,
      url: "",
      phoneNumber: "",
    },
  });
  const [message, setMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newFamily = await createNewFamily(
        formData.familyName,
        formData.rootPerson,
        Number(formData.key)
      );
      await new Promise((resolve) => setInterval(resolve, 5000));
      setMessage(`Family '${newFamily.name}' created successfully'!`);
      toast.success(`Family '${newFamily.name}' created successfully'!`);
      localStorage.setItem("key", formData.key);
      router.push(`family/${newFamily.id}`);
    } catch (error) {
      setMessage("Error creating family: " + error.message);
      toast.error("Please fill out the details");
    } finally {
      setLoading(false);
    }
  };

  const onUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      rootPerson: { ...prev.rootPerson, url: e.info.secure_url },
    }));
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader2 className="animate-spin text-2xl text-blue-500 mr-2" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[350px] border px-4 py-6 flex flex-col gap-6 shadow-lg rounded-lg">
        <div>
          <h3 className="text-xl font-bold">Create family tree</h3>
          <p className="text-muted-foreground">
            Visualize Your Ancestry and Explore Generations of Family
            Connections.
          </p>
        </div>
        {/* <div className="w-full border" /> */}
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
            <label>Key</label>
            <input
              type="number"
              className="border rounded-lg p-2 w-full"
              placeholder="1234"
              value={formData.key}
              onChange={(e) =>
                setFormData({ ...formData, key: e.target.value })
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
          <div>
            <label>Phone number</label>
            <input
              type="tel"
              className="border rounded-lg p-2 w-full"
              placeholder="Enter root member phone number"
              value={formData.rootPerson.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rootPerson: {
                    ...formData.rootPerson,
                    phoneNumber: e.target.value,
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
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin text-2xl" />
              </div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFamilyPage;
