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
import { Trash2, Edit, Check } from "lucide-react";
import { X } from "lucide-react";

const ManageCertifications = () => {
  const [certs, setCerts] = useState([]);
  const [newCert, setNewCert] = useState({
    certName: "",
    from: "",
    certLink: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const certsRef = collection(db, "certifications");
        const querySnapshot = await getDocs(certsRef);
        const processedCerts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCerts(processedCerts);
      } catch (err) {
        console.error("Error fetching certifications:", err);
      }
    };
    fetchCerts();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCert({ ...newCert, [name]: value });
  };

  const handleAddCert = async () => {
    setIsAdding(false);
    if (selectedFile) {
      const storageRef = ref(storage, `certificateImages/${selectedFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await addDoc(collection(db, "certifications"), {
          ...newCert,
          certImagePath: `certificateImages/${selectedFile.name}`,
          certImageUrl: downloadURL,
        });
        setCerts((prevCerts) => [
          ...prevCerts,
          { ...newCert, certImageUrl: downloadURL, id: Date.now() },
        ]);
        setNewCert({
          certName: "",
          from: "",
          certLink: "",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error adding certification:", error);
      }
    } else {
      try {
        await addDoc(collection(db, "certifications"), newCert);
        setCerts((prevCerts) => [...prevCerts, { ...newCert, id: Date.now() }]);
        setNewCert({
          certName: "",
          from: "",
          certLink: "",
        });
      } catch (error) {
        console.error("Error adding certification:", error);
      }
    }
  };

  const handleEditCert = (cert) => {
    setIsEditing(cert.id);
    setNewCert(cert);
    setPreviewUrl(cert.certImageUrl || null);
  };

  const handleUpdateCert = async () => {
    setIsEditing(null);
    if (selectedFile) {
      const storageRef = ref(storage, `certificateImages/${selectedFile.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const certRef = doc(db, "certifications", newCert.id);
        await updateDoc(certRef, {
          ...newCert,
          certImagePath: `certificateImages/${selectedFile.name}`,
          certImageUrl: downloadURL,
        });
        setCerts((prevCerts) =>
          prevCerts.map((cert) =>
            cert.id === newCert.id
              ? {
                  ...newCert,
                  certImageUrl: downloadURL,
                }
              : cert
          )
        );
        setNewCert({
          certName: "",
          from: "",
          certLink: "",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error updating certification:", error);
      }
    } else {
      try {
        const certRef = doc(db, "certifications", newCert.id);
        await updateDoc(certRef, newCert);
        setCerts((prevCerts) =>
          prevCerts.map((cert) =>
            cert.id === newCert.id ? { ...newCert } : cert
          )
        );
        setNewCert({
          certName: "",
          from: "",
          certLink: "",
        });
      } catch (error) {
        console.error("Error updating certification:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setNewCert({
      certName: "",
      from: "",
      certLink: "",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDeleteCert = async (certId, certImagePath) => {
    try {
      if (certImagePath) {
        const storageRef = ref(storage, certImagePath);
        await deleteObject(storageRef);
      }
      const certRef = doc(db, "certifications", certId);
      await deleteDoc(certRef);
      setCerts((prevCerts) => prevCerts.filter((cert) => cert.id !== certId));
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Certifications</h1>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setIsAdding(true)}>Add Certification</Button>
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <Card className="w-full max-w-2xl p-4 bg-white">
              <CardHeader className="mb-4">
                <h2 className="text-xl font-semibold">Add New Certification</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="certName">Certification Name</Label>
                  <Input
                    type="text"
                    id="certName"
                    name="certName"
                    value={newCert.certName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input
                    type="text"
                    id="from"
                    name="from"
                    value={newCert.from}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="certImage">Certificate Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="certImage"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Certificate Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="certLink">Certification Link</Label>
                  <Input
                    type="text"
                    id="certLink"
                    name="certLink"
                    value={newCert.certLink}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCert}>Add Certification</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certs.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <h3 className="text-xl font-semibold">{cert.certName}</h3>
              <p className="text-gray-600">{cert.from}</p>
            </CardHeader>
            <CardContent>
              <a
                href={cert.certLink}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                View Certificate
              </a>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {isEditing === cert.id ? (
                <>
                  <Button
                    onClick={handleUpdateCert}
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
                    onClick={() => handleEditCert(cert)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteCert(cert.id, cert.certImagePath)
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
                <h2 className="text-xl font-semibold">Edit Certification</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="certName">Certification Name</Label>
                  <Input
                    type="text"
                    id="certName"
                    name="certName"
                    value={newCert.certName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input
                    type="text"
                    id="from"
                    name="from"
                    value={newCert.from}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="certImage">Certificate Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="certImage"
                    onChange={handleFileChange}
                  />
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Certificate Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="certLink">Certification Link</Label>
                  <Input
                    type="text"
                    id="certLink"
                    name="certLink"
                    value={newCert.certLink}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={handleUpdateCert}
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

export default ManageCertifications;
