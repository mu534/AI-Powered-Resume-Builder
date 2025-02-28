import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define the type for Resume data
type ResumeProps = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  education: string;
  summary: string;
  certifications: string;
  projects: string;
  languages: string;
  achievements: string;
  links: string;
};

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#333333",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
});

// Define your Resume component that will be converted to PDF
const ResumeDocument: React.FC<{ data: ResumeProps }> = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.text}>
            {data.email} | {data.phone}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Profile Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Experience</Text>
          <Text style={styles.text}>{data.experience}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <Text style={styles.text}>{data.skills}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          <Text style={styles.text}>{data.education}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Certifications</Text>
          <Text style={styles.text}>{data.certifications}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          <Text style={styles.text}>{data.projects}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Languages</Text>
          <Text style={styles.text}>{data.languages}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Achievements</Text>
          <Text style={styles.text}>{data.achievements}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Portfolio / Links</Text>
          <Text style={[styles.text, styles.link]}>{data.links}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
