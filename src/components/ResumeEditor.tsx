import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import { Resume } from "../types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

const initialResume: Resume = {
  id: "1",
  name: "My Resume",
  content: {
    personal: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "123-456-7890",
      summary: "",
    },
    experience: [],
    skills: ["React", "TypeScript"],
  },
  templateId: "t1",
};

const ResumeEditor: React.FC = () => {
  const [resume, setResume] = useState<Resume>(() => {
    const saved = localStorage.getItem("resume");
    return saved ? JSON.parse(saved) : initialResume;
  });

  useEffect(() => {
    localStorage.setItem("resume", JSON.stringify(resume));
  }, [resume]);

  const updatePersonal = (
    field: keyof Resume["content"]["personal"],
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        personal: { ...prev.content.personal, [field]: value },
      },
    }));
  };

  const addExperience = () => {
    const newExp = {
      title: "New Role",
      company: "Company",
      dates: "2023-2025",
      description: "Did stuff",
    };
    setResume((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        experience: [...prev.content.experience, newExp],
      },
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(resume.content.experience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setResume((prev) => ({
      ...prev,
      content: { ...prev.content, experience: items },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-900 mb-4">
        Craft Your Resume
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          value={resume.content.personal.name}
          onChange={(e) => updatePersonal("name", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your Name"
        />
        <input
          type="email"
          value={resume.content.personal.email}
          onChange={(e) => updatePersonal("email", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email Address"
        />
        <textarea
          value={resume.content.personal.summary || ""}
          onChange={(e) => updatePersonal("summary", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Professional Summary"
        />

        {/* Drag & Drop Experience */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="experience">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {resume.content.experience.map((exp, index) => (
                  <Draggable key={index} draggableId={`${index}`} index={index}>
                    {(provided) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-lg border"
                      >
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-gray-50 rounded-lg flex items-center"
                        >
                          <span className="font-medium text-gray-800">
                            {exp.title} - {exp.company}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addExperience}
          className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
        >
          <FaPlus /> Add Experience
        </motion.button>

        <PDFDownloadLink
          document={<ResumePDF resume={resume} />}
          fileName="resume.pdf"
          className="inline-block mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
        >
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumeEditor;
