"use client";

import { useState, useEffect } from "react";
import { getPerson } from "@/lib/action/get-person";
import { useParams, useRouter } from "next/navigation";
import { updatePerson } from "@/lib/action/update-person";
import { deletePerson } from "@/lib/action/delete-person";
import { useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCreator } from "@/lib/action/get-creator";

export default function UpdatePersonForm() {
  const { data, status } = useSession(authOptions);
  const [creatorId, setCreatorId] = useState(null);

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

  function extractFirstUUID(url) {
    const pattern =
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
    const match = url.match(pattern);
    return match ? match[0] : null;
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log(data);
      signIn();
    }
  }, [status]);

  // Fetch the person's data on component mount
  useEffect(() => {
    async function fetchPerson() {
      try {
        const person = await getPerson(params.personId);
        //
        const url = window.location.href;
        const firstUUID = extractFirstUUID(url);
        const res = await getCreator(firstUUID);
        //
        setFormData({
          name: person.name,
          gender: person.gender,
          dob: person.dob,
          alive: person.alive,
        });
        setCreatorId(res);
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
      console.error("Failed to delete person:", errordata.user.email);
      setError("Failed to delete person.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data.user && data.user.email !== creatorId) {
    alert("Unauthorized");
    router.back();
  }

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
