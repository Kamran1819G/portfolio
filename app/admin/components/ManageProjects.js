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

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    sourceCodeLink: "",
    deployLink: "",
    status: "completed",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const querySnapshot = await getDocs(projectsRef);

        const processedProjects = querySnapshot.docs.map((doc) => {
          const projectData = doc.data();
          return {
            id: doc.id,
            ...projectData,
          };
        });
        setProjects(processedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (techInput.trim() !== "") {
      const newTech = {
        name: techInput.trim(),
        iconPath: null,
        color: "#182848", // Or generate a dynamic color
      };
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech],
      });
      setTechInput("");
    }
  };
  const handleTechInputChange = (e) => {
    setTechInput(e.target.value);
  };
  const handleRemoveTechnology = (index) => {
    const updatedTechs = [...newProject.technologies];
    updatedTechs.splice(index, 1);
    setNewProject({ ...newProject, technologies: updatedTechs });
  };

  const handleAddProject = async () => {
    setIsAdding(false);
    if (selectedFile) {
      const storageRef = ref(storage, `projectImages/${selectedFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await addDoc(collection(db, "projects"), {
          ...newProject,
          imagePath: `projectImages/${selectedFile.name}`,
          imageUrl: downloadURL,
        });
        setProjects((prevProjects) => [
          ...prevProjects,
          { ...newProject, imageUrl: downloadURL, id: Date.now() },
        ]);
        setNewProject({
          title: "",
          description: "",
          technologies: [],
          sourceCodeLink: "",
          deployLink: "",
          status: "completed",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error adding project:", error);
      }
    } else {
      try {
        await addDoc(collection(db, "projects"), newProject);
        setProjects((prevProjects) => [
          ...prevProjects,
          { ...newProject, id: Date.now() },
        ]);
        setNewProject({
          title: "",
          description: "",
          technologies: [],
          sourceCodeLink: "",
          deployLink: "",
          status: "completed",
        });
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };

  const handleEditProject = (project) => {
    setIsEditing(project.id);
    setNewProject({
      ...project,
      technologies: project.technologies || [],
    });
    setPreviewUrl(project.imageUrl || null);
  };

  const handleUpdateProject = async () => {
    setIsEditing(null);
    if (selectedFile) {
      const storageRef = ref(storage, `projectImages/${selectedFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const projectRef = doc(db, "projects", newProject.id);
        await updateDoc(projectRef, {
          ...newProject,
          imagePath: `projectImages/${selectedFile.name}`,
          imageUrl: downloadURL,
        });
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === newProject.id
              ? {
                  ...newProject,
                  imageUrl: downloadURL,
                }
              : proj
          )
        );
        setNewProject({
          title: "",
          description: "",
          technologies: [],
          sourceCodeLink: "",
          deployLink: "",
          status: "completed",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error updating project:", error);
      }
    } else {
      try {
        const projectRef = doc(db, "projects", newProject.id);
        await updateDoc(projectRef, newProject);
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj.id === newProject.id ? { ...newProject } : proj
          )
        );
        setNewProject({
          title: "",
          description: "",
          technologies: [],
          sourceCodeLink: "",
          deployLink: "",
          status: "completed",
        });
      } catch (error) {
        console.error("Error updating project:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewProject({
      title: "",
      description: "",
      technologies: [],
      sourceCodeLink: "",
      deployLink: "",
      status: "completed",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDeleteProject = async (projectId, imagePath) => {
    try {
      if (imagePath) {
        const storageRef = ref(storage, imagePath);
        await deleteObject(storageRef);
      }
      const projectRef = doc(db, "projects", projectId);
      await deleteDoc(projectRef);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsAdding(true)}>Add Project</Button>
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl p-4 bg-white">
              <CardHeader className="mb-4">
                <h2 className="text-xl font-semibold">Add New Project</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Project Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Add Technology"
                      value={techInput}
                      onChange={handleTechInputChange}
                    />
                    <Button onClick={handleAddTechnology} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.technologies?.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        style={{
                          backgroundColor: tech.color || "#c9fd74",
                          color: tech.color ? "#fff" : "#000",
                        }}
                        className="text-white rounded-full px-2 flex items-center gap-1"
                      >
                        {tech.name}
                        <button
                          onClick={() => handleRemoveTechnology(i)}
                          className="ml-1 text-white text-sm hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="sourceCodeLink">Source Code Link</Label>
                  <Input
                    type="text"
                    id="sourceCodeLink"
                    name="sourceCodeLink"
                    value={newProject.sourceCodeLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="deployLink">Deploy Link</Label>
                  <Input
                    type="text"
                    id="deployLink"
                    name="deployLink"
                    value={newProject.deployLink}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>Add Project</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies?.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    style={{
                      backgroundColor: tech.color || "#c9fd74",
                      color: tech.color ? "#fff" : "#000",
                    }}
                    className="text-white rounded-full px-2 flex items-center gap-1"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing === project.id ? (
                <>
                  <Button
                    onClick={handleUpdateProject}
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
                <>
                  <Button
                    onClick={() => handleEditProject(project)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteProject(project.id, project.imagePath)
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
        ))}

        {isEditing !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl p-4 bg-white">
              <CardHeader className="mb-4">
                <h2 className="text-xl font-semibold">Edit Project</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Project Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Add Technology"
                      value={techInput}
                      onChange={handleTechInputChange}
                    />
                    <Button onClick={handleAddTechnology} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.technologies?.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        style={{
                          backgroundColor: tech.color || "#c9fd74",
                          color: tech.color ? "#fff" : "#000",
                        }}
                        className="text-white rounded-full px-2 flex items-center gap-1"
                      >
                        {tech.name}
                        <button
                          onClick={() => handleRemoveTechnology(i)}
                          className="ml-1 text-white text-sm hover:text-red-500 focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="sourceCodeLink">Source Code Link</Label>
                  <Input
                    type="text"
                    id="sourceCodeLink"
                    name="sourceCodeLink"
                    value={newProject.sourceCodeLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="deployLink">Deploy Link</Label>
                  <Input
                    type="text"
                    id="deployLink"
                    name="deployLink"
                    value={newProject.deployLink}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={handleUpdateProject}
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

export default ManageProjects;
