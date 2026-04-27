import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Animated, { FadeInUp } from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

const stabilityData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      data: [24, 26, 30, 32],
      color: () => `rgba(124, 131, 253, 1)`,
      strokeWidth: 3,
    },
  ],
};

const StabilityCard = () => {
  return (
    <Animated.View
      entering={FadeInUp.duration(600).delay(100)}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Stability Summary</Text>
          <Text style={styles.subtitle}>
            Based on your recent logs and symptom patterns.
          </Text>
          <Text style={styles.value}>78%</Text>
        </View>

        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>Stability Improving</Text>
        </View>
      </View>

      {/* CHART WRAPPER (IMPORTANT FIX) */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={stabilityData}
          width={screenWidth} // 👈 FULL WIDTH
          height={180}
          bezier
          withShadow
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,

            color: () => `rgba(124, 131, 253, 1)`,

            fillShadowGradientFrom: "#C4B5FD",
            fillShadowGradientTo: "#A78BFA",
            fillShadowGradientOpacity: 0.35,

            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#4ade80",
            },

            propsForBackgroundLines: {
              stroke: "#eee",
            },

            // 🔥 REMOVE INTERNAL PADDING
            propsForLabels: {
              dx: 0,
            },
          }}
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={true}
        />
      </View>
    </Animated.View>
  );
};

export default StabilityCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },

  subtitle: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
    marginBottom: 6,
  },

  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  tooltip: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  tooltipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // 🔥 THIS IS THE REAL FIX
  chartWrapper: {
    marginLeft: -16,
    marginRight: -16,
  },

  chart: {
    borderRadius: 16,
  },
});