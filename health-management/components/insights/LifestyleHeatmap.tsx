import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { HealthPalette } from "../../constants/theme";

const { width } = Dimensions.get("window");
const SQUARE_SIZE = (width - 120) / 7;

const categories = [
  { name: "Sleep", color: HealthPalette.indigo },
  { name: "Hydration", color: HealthPalette.mint },
  { name: "Caffeine", color: HealthPalette.yellow },
  { name: "Exercise", color: HealthPalette.coral },
];
const days = ["M", "T", "W", "T", "F", "S", "S"];

// Mock data: 4 categories x 7 days
const data = [
  [0.8, 0.6, 0.9, 0.7, 0.4, 1.0, 0.8], // Sleep
  [0.4, 0.9, 0.7, 0.8, 1.0, 0.6, 0.9], // Hydration
  [1.0, 0.8, 0.4, 0.6, 0.7, 0.2, 0.5], // Caffeine
  [0.2, 0.4, 1.0, 0.3, 0.6, 0.8, 0.9], // Exercise
];

const LifestyleHeatmap = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lifestyle Impact</Text>
      <Text style={styles.subtitle}>Daily activity tracking</Text>

      <View style={styles.gridContainer}>
    
        <View style={styles.daysHeader}>
          {days.map((day, i) => (
            <Text key={i} style={styles.dayText}>{day}</Text>
          ))}
        </View>
        {categories.map((category, rowIndex) => (
          <View key={category.name} style={styles.row}>
            <Text style={styles.categoryLabel}>{category.name}</Text>
            <View style={styles.squaresRow}>
              {data[rowIndex].map((val, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    styles.square,
                    {
                      backgroundColor: category.color,
                      opacity: val,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.legend}>
        <Text style={styles.legendLabel}>Less</Text>
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((op) => (
          <View key={op} style={[styles.legendSquare, { opacity: op }]} />
        ))}
        <Text style={styles.legendLabel}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  gridContainer: {
    marginTop: 10,
  },
  daysHeader: {
    flexDirection: "row",
    marginLeft: 80,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  dayText: {
    fontSize: 10,
    color: "#9ca3af",
    width: SQUARE_SIZE,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: "#4b5563",
    width: 80,
  },
  squaresRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    borderRadius: 4,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  legendLabel: {
    fontSize: 10,
    color: "#9ca3af",
    marginHorizontal: 4,
  },
  legendSquare: {
    width: 12,
    height: 12,
    backgroundColor: "#9ca3af",
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default LifestyleHeatmap;