import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { chartConfig } from "../../constants/chartConfig";

const screenWidth = Dimensions.get("window").width;

const StabilityCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Stability Summary</Text>
          <Text style={styles.value}>78%</Text>
        </View>
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>Stability Improving</Text>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [65, 70, 68, 72, 75, 74, 78],
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, 
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth - 64} 
        height={180}
        chartConfig={{
          ...chartConfig,
          fillShadowGradient: "#6366f1",
          fillShadowGradientOpacity: 0.2,
        }}
        bezier
        style={styles.chart}
        withDots={true}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        fromZero={true}
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },
  tooltip: {
    backgroundColor: "#e0e7ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tooltipText: {
    fontSize: 12,
    color: "#4338ca",
    fontWeight: "600",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 0,
  },
});

export default StabilityCard;