import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors, Shadows } from "../../constants/colors";
import { baseChartConfig } from "../../constants/chartConfig";

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
    <Animated.View 
      entering={FadeInUp.duration(600).delay(200)}
      style={[styles.container, Shadows.soft]}
    >
      <Text style={styles.title}>Cycle Trends</Text>
      <Text style={styles.subtitle}>Cycle length consistency (days)</Text>

      <BarChart
        data={data}
        width={screenWidth - 64}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          ...baseChartConfig,
          color: (opacity = 1) => `rgba(110, 231, 183, ${opacity})`, // Mint
          fillShadowGradient: Colors.mint,
          fillShadowGradientOpacity: 1,
          barPercentage: 0.7,
        }}
        verticalLabelRotation={0}
        style={styles.chart}
        showBarTops={false}
        fromZero={true}
        flatColor={true}
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 0,
    marginLeft: -16, // To align better with labels
  },
});

export default CycleTrendsChart;