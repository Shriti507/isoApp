import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors, Shadows } from "../../constants/colors";

const { width } = Dimensions.get("window");
const SQUARE_SIZE = (width - 120) / 7;

const categories = [
  { name: "Sleep", color: Colors.indigo },
  { name: "Hydration", color: Colors.mint },
  { name: "Caffeine", color: Colors.yellow },
  { name: "Exercise", color: Colors.coral },
];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const data = [
  [0.8, 0.6, 0.9, 0.7, 0.4, 1.0, 0.8], // Sleep
  [0.4, 0.9, 0.7, 0.8, 1.0, 0.6, 0.9], // Hydration
  [1.0, 0.8, 0.4, 0.6, 0.7, 0.2, 0.5], // Caffeine
  [0.2, 0.4, 1.0, 0.3, 0.6, 0.8, 0.9], // Exercise
];

const LifestyleHeatmap = () => {
  return (
    <Animated.View 
      entering={FadeInUp.duration(600).delay(500)}
      style={[styles.container, Shadows.soft]}
    >
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  gridContainer: {
    marginTop: 10,
  },
  daysHeader: {
    flexDirection: "row",
    marginLeft: 80,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  dayText: {
    fontSize: 10,
    color: Colors.textSecondary,
    width: SQUARE_SIZE,
    textAlign: "center",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 12,
    color: Colors.textPrimary,
    width: 80,
    fontWeight: "500",
  },
  squaresRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  square: {
    width: SQUARE_SIZE - 4,
    height: SQUARE_SIZE - 4,
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
    color: Colors.textSecondary,
    marginHorizontal: 4,
  },
  legendSquare: {
    width: 12,
    height: 12,
    backgroundColor: Colors.textSecondary,
    borderRadius: 2,
    marginHorizontal: 2,
  },
});

export default LifestyleHeatmap;