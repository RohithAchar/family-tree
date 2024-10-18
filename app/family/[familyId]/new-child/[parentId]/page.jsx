"use client";

import { useParams, useRouter } from "next/navigation";

import { createChild } from "@/action/create-child";
// pages/addChild.js

import { useState } from "react";

const AddChildPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    alive: true,
  });
  const [message, setMessage] = useState("");
  const params = useParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parentId = params.parentId;
      console.log(parentId);
      const newChild = await createChild(parentId, formData);
      setMessage(`Child ${newChild.name} created successfully!`);
      router.back();
    } catch (error) {
      setMessage("Error creating child: " + error.message);
    }
  };

  return (
    <div>
      <h1>Add Child</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              checked={formData.gender === "male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
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
              checked={formData.gender === "female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Alive</label>
          <input
            type="checkbox"
            checked={formData.alive}
            onChange={(e) =>
              setFormData({ ...formData, alive: e.target.checked })
            }
          />
        </div>
        <button type="submit">Add Child</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddChildPage;
