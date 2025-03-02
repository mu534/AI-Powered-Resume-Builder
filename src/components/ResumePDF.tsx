import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Resume } from "../types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

interface ResumePDFProps {
  resume: Resume;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{resume.content.personal.name}</Text>
        <Text style={styles.text}>{resume.content.personal.email}</Text>
        <Text style={styles.text}>{resume.content.personal.phone}</Text>
        {resume.content.personal.summary && (
          <Text style={styles.text}>{resume.content.personal.summary}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Experience</Text>
        {resume.content.experience.map((exp, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.text}>
              {exp.title} - {exp.company}
            </Text>
            <Text style={styles.text}>{exp.dates}</Text>
            <Text style={styles.text}>{exp.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Skills</Text>
        <Text style={styles.text}>{resume.content.skills.join(", ")}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
