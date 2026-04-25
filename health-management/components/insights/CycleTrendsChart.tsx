import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { chartConfig } from "../../constants/chartConfig";

const screenWidth = Dimensions.get("window").width;

const CycleTrendsChart = () => {
  const data = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        data: [28, 30, 29, 31, 28, 29],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cycle Trends</Text>
      <Text style={styles.subtitle}>Cycle length consistency</Text>

      <BarChart
        data={data}
        width={screenWidth - 64}
        height={220}
        yAxisLabel=""
        yAxisSuffix="d"
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          fillShadowGradient: "#6366f1",
          fillShadowGradientOpacity: 1,
        }}
        verticalLabelRotation={0}
        style={styles.chart}
        showBarTops={false}
        fromZero={true}
        flatColor={true}
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 0,
  },
});

export default CycleTrendsChart;