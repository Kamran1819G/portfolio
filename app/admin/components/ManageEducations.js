// app/admin/components/ManageEducations.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Check, X } from "lucide-react";

const ManageEducations = () => {
  // State variables
  const [educations, setEducations] = useState([]); // List of education entries
  const [newEducation, setNewEducation] = useState({
    // Form data for new or edited entry
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    achievements: [],
  });
  const [isAdding, setIsAdding] = useState(false); // Flag to indicate if we're adding a new entry
  const [isEditing, setIsEditing] = useState(null); // ID of entry being edited, null if none
  const [achievementInput, setAchievementInput] = useState(""); // Input for individual achievements
  const [selectedFile, setSelectedFile] = useState(null); // Currently selected image file
  const [previewUrl, setPreviewUrl] = useState(null); // URL for image preview

  // Fetch education data on component mount
  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const educationsRef = collection(db, "educations"); // Reference to 'educations' collection in Firebase
        const querySnapshot = await getDocs(educationsRef); // Get all documents
        const processedEducations = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Include document data
        }));
        setEducations(processedEducations); // Update state with fetched data
      } catch (err) {
        console.error("Error fetching educations:", err);
      }
    };
    fetchEducations();
  }, []);

  // Handler for image file changes
  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // Get selected file

    setSelectedFile(file); // Update selected file in state

    // Create temporary URL for preview if a file was selected
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get input name and value
    setNewEducation({ ...newEducation, [name]: value }); // Update the newEducation object state
  };

  // Handle adding new achievements
  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (achievementInput.trim() !== "") {
      // Ensure input isn't empty
      setNewEducation({
        ...newEducation,
        achievements: [...newEducation.achievements, achievementInput.trim()], // Add the input achievement to the array of achievements
      });
      setAchievementInput(""); // Reset achievement input
    }
  };

  // Handle changes to the achievement input field
  const handleAchievementInputChange = (e) => {
    setAchievementInput(e.target.value);
  };

  // Handle deleting of achievements
  const handleRemoveAchievement = (index) => {
    const updatedAchievements = [...newEducation.achievements]; // Copy existing achievements
    updatedAchievements.splice(index, 1); // Delete achievement by index
    setNewEducation({ ...newEducation, achievements: updatedAchievements }); // Update achievements
  };

  // Handler for adding new education
  const handleAddEducation = async () => {
    setIsAdding(false); // Reset the adding flag
    if (selectedFile) {
      // If a new image file has been selected
      const storageRef = ref(storage, `institutionLogos/${selectedFile.name}`); // Create storage reference
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile); // Upload image to storage
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the downloadable URL
        await addDoc(collection(db, "educations"), {
          // Add the new education data to firestore
          ...newEducation,
          institutionLogoPath: `institutionLogos/${selectedFile.name}`, // Store file path
          institutionLogoUrl: downloadURL, // Store Downloadable URL
        });
        setEducations((prevEducations) => [
          // Update the local education list with new entry
          ...prevEducations,
          { ...newEducation, institutionLogoUrl: downloadURL, id: Date.now() }, // Append new entry with a temporary ID for local updates
        ]);
        setNewEducation({
          // Reset the newEducation data after adding
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
          achievements: [],
        });
        setSelectedFile(null); // Reset the selected file
        setPreviewUrl(null); // Reset image preview
      } catch (error) {
        console.error("Error adding education:", error);
      }
    } else {
      // If no new image has been added
      try {
        await addDoc(collection(db, "educations"), newEducation); // Add to firebase without new image url
        setEducations((prevEducations) => [
          ...prevEducations,
          { ...newEducation, id: Date.now() },
        ]);
        setNewEducation({
          // Reset the form data after adding
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
          achievements: [],
        });
      } catch (error) {
        console.error("Error adding education:", error);
      }
    }
  };

  // Handler for starting to edit an entry
  const handleEditEducation = (education) => {
    setIsEditing(education.id); // Set the ID of the item that will be edited
    setNewEducation({
      ...education,
      achievements: education.achievements || [],
    }); // Copy entry data to form
    setPreviewUrl(education.institutionLogoUrl || null); // Set existing url if present for preview
  };

  // Handler for updating an entry
  const handleUpdateEducation = async () => {
    setIsEditing(null); // reset editing flag
    if (selectedFile) {
      // If a new image has been selected
      const storageRef = ref(storage, `institutionLogos/${selectedFile.name}`); // Reference to storage
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile); // Upload new image
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the new download link
        const educationRef = doc(db, "educations", newEducation.id); // Get firestore document
        await updateDoc(educationRef, {
          // update firestore with new data
          ...newEducation,
          institutionLogoPath: `institutionLogos/${selectedFile.name}`,
          institutionLogoUrl: downloadURL,
        });
        setEducations((prevEducations) =>
          prevEducations.map(
            (edu) =>
              edu.id === newEducation.id
                ? { ...newEducation, institutionLogoUrl: downloadURL }
                : edu // Update list with new url
          )
        );
        setNewEducation({
          // Reset form data
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
          achievements: [],
        });
        setSelectedFile(null); // Reset selected image file
        setPreviewUrl(null); // Reset preview url
      } catch (error) {
        console.error("Error updating education:", error);
      }
    } else {
      // If no new image selected just update document without new image
      try {
        const educationRef = doc(db, "educations", newEducation.id); // Get reference to document
        await updateDoc(educationRef, newEducation); // Update the database record
        setEducations((prevEducations) =>
          prevEducations.map(
            (edu) => (edu.id === newEducation.id ? { ...newEducation } : edu) // update local list
          )
        );
        setNewEducation({
          // Reset form data
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
          achievements: [],
        });
      } catch (error) {
        console.error("Error updating education:", error);
      }
    }
  };

  // Handler for canceling edit/add actions
  const handleCancelEdit = () => {
    setIsEditing(null); // Clear the edit flag
    setNewEducation({
      // Reset the form data
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
      achievements: [],
    });
    setSelectedFile(null); // Reset selected file
    setPreviewUrl(null); // Clear image preview url
  };

  // Handler for deleting an entry
  const handleDeleteEducation = async (educationId, institutionLogoPath) => {
    try {
      if (institutionLogoPath) {
        const storageRef = ref(storage, institutionLogoPath);
        await deleteObject(storageRef); // Delete the image
      }
      const educationRef = doc(db, "educations", educationId); // Get firestore document
      await deleteDoc(educationRef); // Delete the document
      setEducations(
        (prevEducations) =>
          prevEducations.filter((edu) => edu.id !== educationId) // remove entry from list
      );
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Educations</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsAdding(true)}>Add Education</Button>{" "}
        {/* Button to toggle add modal */}
        {isAdding && ( // Modal for adding new education entry
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl p-4 bg-white">
              {/* Add New Education Form */}
              <CardHeader className="mb-4">
                <h2 className="text-xl font-semibold">Add New Education</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input
                    type="text"
                    id="institution"
                    name="institution"
                    value={newEducation.institution}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="institutionLogo">Institution Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="institutionLogo"
                    onChange={handleFileChange}
                  />
                  {previewUrl && ( // Display preview if there is url
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Institution Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    type="text"
                    id="degree"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="text"
                    id="startDate"
                    name="startDate"
                    value={newEducation.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="text"
                    id="endDate"
                    name="endDate"
                    value={newEducation.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newEducation.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={newEducation.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="achievements">Achievements</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Add Achievement"
                      value={achievementInput}
                      onChange={handleAchievementInputChange}
                    />
                    <Button onClick={handleAddAchievement} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newEducation.achievements?.map((achievement, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-white rounded-full px-2 flex items-center gap-1"
                      >
                        {achievement}
                        <button
                          onClick={() => handleRemoveAchievement(i)}
                          className="ml-1 text-white text-sm hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEducation}>Add Education</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {educations.map(
          (
            education // Loop through fetched educations to generate cards
          ) => (
            <Card key={education.id}>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  {education.institution}
                </h3>
                <p className="text-gray-600">{education.degree}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 line-clamp-2">
                  {education.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {education.achievements?.map((achievement, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-white rounded-full px-2 flex items-center gap-1"
                    >
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {isEditing === education.id ? ( // Check if this entry is being edited
                  <>
                    <Button
                      onClick={handleUpdateEducation}
                      className="flex items-center gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Update
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  // If not being edited, render Edit and Delete buttons
                  <>
                    <Button
                      onClick={() => handleEditEducation(education)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteEducation(
                          education.id,
                          education.institutionLogoPath
                        )
                      }
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          )
        )}
        {isEditing !== null && ( // Modal for editing an entry
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl p-4 bg-white">
              {/* Edit Education Form */}
              <CardHeader className="mb-4">
                <h2 className="text-xl font-semibold">Edit Education</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input
                    type="text"
                    id="institution"
                    name="institution"
                    value={newEducation.institution}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="institutionLogo">Institution Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="institutionLogo"
                    onChange={handleFileChange}
                  />
                  {previewUrl && ( // Show image preview if there is a url present
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Institution Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    type="text"
                    id="degree"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="text"
                    id="startDate"
                    name="startDate"
                    value={newEducation.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    type="text"
                    id="endDate"
                    name="endDate"
                    value={newEducation.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newEducation.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={newEducation.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="achievements">Achievements</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Add Achievement"
                      value={achievementInput}
                      onChange={handleAchievementInputChange}
                    />
                    <Button onClick={handleAddAchievement} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newEducation.achievements?.map((achievement, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-white rounded-full px-2 flex items-center gap-1"
                      >
                        {achievement}
                        <button
                          onClick={() => handleRemoveAchievement(i)}
                          className="ml-1 text-white text-sm hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={handleUpdateEducation}
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  Update
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEducations;
