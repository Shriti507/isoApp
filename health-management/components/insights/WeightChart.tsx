import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors, Shadows } from "../../constants/colors";
import { baseChartConfig } from "../../constants/chartConfig";

const screenWidth = Dimensions.get("window").width;

const WeightChart = () => {
  const [activeTab, setActiveTab] = useState("Weekly");

  const weeklyData = {
    labels: ["W1", "W2", "W3", "W4", "W5"],
    datasets: [{ data: [65.8, 65.2, 65.5, 64.8, 64.5] }],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{ data: [67.0, 66.5, 65.8, 65.2, 64.5] }],
  };

  const data = activeTab === "Weekly" ? weeklyData : monthlyData;

  return (
    <Animated.View 
      entering={FadeInUp.duration(600).delay(300)}
      style={[styles.container, Shadows.soft]}
    >
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
        data={data}
        width={screenWidth - 64}
        height={180}
        chartConfig={{
          ...baseChartConfig,
          color: (opacity = 1) => `rgba(252, 165, 165, ${opacity})`, // Coral
          fillShadowGradient: Colors.coral,
          fillShadowGradientOpacity: 0.1,
          propsForDots: {
            ...baseChartConfig.propsForDots,
            stroke: Colors.coral,
          },
        }}
        bezier
        style={styles.chart}
        withDots={true}
        withInnerLines={false}
        withVerticalLines={false}
        fromZero={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.graySoft,
    borderRadius: 8,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: Colors.white,
    ...Shadows.soft,
    elevation: 1,
  },
  toggleText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: Colors.textPrimary,
  },
  weightValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10,
  },
  weightValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  weightUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
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
    color: Colors.success,
    fontWeight: "600",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 0,
    marginLeft: -16,
  },
});

export default WeightChart;