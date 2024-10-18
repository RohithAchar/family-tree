"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { addSpouse } from "@/action/create-spouse"; // The addSpouse function we created earlier

const AddSpouseForm = () => {
  const [spouseData, setSpouseData] = useState({
    name: "",
    gender: "female", // Default to female
    dob: "",
    alive: true,
    familyId: "", // Optional if needed
  });
  const [message, setMessage] = useState("");
  const params = useParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const personId = params.spouseId;
      console.log("personId: " + personId);
      const result = await addSpouse(personId, spouseData);
      setMessage(`Spouse added successfully!`);
      router.back();
    } catch (error) {
      setMessage(`Error adding spouse: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Add a Spouse</h1>
      <form onSubmit={handleSubmit}>
        {/* Spouse Name */}
        <div>
          <label>Spouse Name</label>
          <input
            type="text"
            value={spouseData.name}
            onChange={(e) =>
              setSpouseData({ ...spouseData, name: e.target.value })
            }
            required
          />
        </div>

        {/* Gender Radio Buttons */}
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
            <label htmlFor="female">Female</label>
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
            <label htmlFor="male">Male</label>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={spouseData.dob}
            onChange={(e) =>
              setSpouseData({ ...spouseData, dob: e.target.value })
            }
            required
          />
        </div>

        {/* Alive Checkbox */}
        <div>
          <label>Alive</label>
          <input
            type="checkbox"
            checked={spouseData.alive}
            onChange={(e) =>
              setSpouseData({ ...spouseData, alive: e.target.checked })
            }
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Add Spouse</button>
      </form>

      {/* Message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSpouseForm;
