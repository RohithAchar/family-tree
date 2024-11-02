"use client";

import { useState, useEffect } from "react";
import { getPerson } from "@/lib/action/get-person";
import { useParams } from "next/navigation";
import { updatePerson } from "@/lib/action/update-person";
import { deletePerson } from "@/lib/action/delete-person";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash } from "lucide-react";
import { extractFirstUUID } from "@/lib/utils";
import toast from "react-hot-toast";

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

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const data = await updatePerson(
        params.personId,
        formData,
        Number(localStorage.getItem("key")),
        params.familyId
      );
      if (data.status === 401) {
        toast.error("Unauthorized");
        window.location.href = "/family/" + params.familyId;
        return;
      }
      toast.success("Person updated successfully!");
      window.location.href = `/family/${params.familyId}`;
    } catch (error) {
      toast.error("Failed to update person: ");
      console.error("Failed to update person:", error);
      setError("Failed to update person.");
    }
  };
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this person?");
    if (!confirmed) return;

    try {
      const res = await deletePerson(
        params.personId,
        Number(localStorage.getItem("key")),
        params.familyId
      );
      if (res.status === 401) {
        toast.error("Unauthorized");
        window.location.href = "/family/" + params.familyId;
        return;
      }
      if (res.status === 400) {
        toast.error("Cannot delete root person");
        window.location.href = "/family/" + params.familyId;
        return;
      }
      toast.success("Person deleted successfully!");
      window.location.href = `/family/${params.familyId}`;
    } catch (error) {
      toast.error("Failed to delete person");
      console.error("Failed to delete person:", error.data.user.email);
      setError("Failed to delete person.");
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
  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (localStorage.getItem("key") == null) {
    window.location.href = "/family/" + params.familyId;
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[350px] border px-4 py-6 flex flex-col gap-6 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Edit member</h3>
              <p className="text-muted-foreground">Hello</p>
            </div>
            <button
              className="border p-2 rounded-lg bg-red-500 text-white"
              type="button"
              onClick={handleDelete}
            >
              <Trash />
            </button>
          </div>
          <div className="w-full border" />
          <div className="flex flex-col gap-2">
            <div>
              <label>Name</label>
              <input
                className="border p-2 rounded-lg w-full"
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
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: Number(e.target.value),
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
              <label>Gender:</label>
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
                <label htmlFor="male">Male</label>
                <input
                  className="ml-2"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <div>
              <label>Date of Birth:</label>
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
            <div className="flex">
              <label>Alive:</label>
              <input
                className="ml-2"
                type="checkbox"
                checked={formData.alive}
                onChange={(e) =>
                  setFormData({ ...formData, alive: e.target.checked })
                }
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.location.href = `/family/${params.familyId}`;
                }}
                className="border rounded-lg p-2 w-full"
              >
                Cancel
              </button>
              <button
                className="border rounded-lg p-2 w-full bg-black text-white"
                onClick={handleSubmit}
              >
                Update Person
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
