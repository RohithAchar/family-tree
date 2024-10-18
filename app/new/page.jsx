"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewFamily } from "@/action/create-family";

const CreateFamilyPage = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    rootPerson: {
      name: "",
      gender: "male", // Default value for gender
      dob: "",
      alive: true,
    },
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = "123";

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

  return (
    <div>
      <h1>Create New Family</h1>
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
                rootPerson: { ...formData.rootPerson, alive: e.target.checked },
              })
            }
          />
        </div>
        <button type="submit">Create Family</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateFamilyPage;
