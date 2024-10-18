"use client";

import { useState, useEffect } from "react";
import { getPerson } from "@/action/get-person";
import { useParams, useRouter } from "next/navigation";
import { updatePerson } from "@/action/update-person";
import { deletePerson } from "@/action/delete-person";

export default function UpdatePersonForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    alive: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const router = useRouter();

  // Fetch the person's data on component mount
  useEffect(() => {
    async function fetchPerson() {
      try {
        const person = await getPerson(params.personId);
        setFormData({
          name: person.name,
          gender: person.gender,
          dob: person.dob,
          alive: person.alive,
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePerson(params.personId, formData);
      alert("Person updated successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to update person:", error);
      setError("Failed to update person.");
    }
  };
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this person?");
    if (!confirmed) return;

    try {
      await deletePerson(params.personId);
      alert("Person deleted successfully!");
      // Optionally, redirect or refresh after deletion
      router.back();
    } catch (error) {
      console.error("Failed to delete person:", error);
      setError("Failed to delete person.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

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
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Alive:</label>
        <input
          type="checkbox"
          checked={formData.alive}
          onChange={(e) =>
            setFormData({ ...formData, alive: e.target.checked })
          }
        />
      </div>

      <button type="submit">Update Person</button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
      >
        Delete Person
      </button>
    </form>
  );
}
