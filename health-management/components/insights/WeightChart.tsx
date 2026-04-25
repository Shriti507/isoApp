import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { redChartConfig } from "../../constants/chartConfig";

const screenWidth = Dimensions.get("window").width;

const WeightChart = () => {
  const [activeTab, setActiveTab] = useState("Weekly");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Body & Metabolic Trends</Text>
          <Text style={styles.subtitle}>Weight tracking</Text>
        </View>
        <View style={styles.toggleContainer}>
          {["Weekly", "Monthly"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.toggleButton,
                activeTab === tab && styles.toggleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  activeTab === tab && styles.toggleTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.weightValueContainer}>
        <Text style={styles.weightValue}>64.5</Text>
        <Text style={styles.weightUnit}>kg</Text>
        <View style={styles.trendIndicator}>
          <Text style={styles.trendText}>↓ 0.8 kg</Text>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["W1", "W2", "W3", "W4", "W5"],
          datasets: [
            {
              data: [65.8, 65.2, 65.5, 64.8, 64.5],
              color: (opacity = 1) => `rgba(248, 113, 113, ${opacity})`, // red
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth - 64}
        height={180}
        chartConfig={{
          ...redChartConfig,
          fillShadowGradient: "#f87171",
          fillShadowGradientOpacity: 0.1,
        }}
        bezier
        style={styles.chart}
        withDots={true}
        withInnerLines={false}
        withVerticalLines={false}
        fromZero={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
  },
  toggleTextActive: {
    color: "#1f2937",
  },
  weightValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  weightValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  weightUnit: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 4,
  },
  trendIndicator: {
    marginLeft: 12,
    backgroundColor: "#ecfdf5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 0,
  },
});

export default WeightChart;