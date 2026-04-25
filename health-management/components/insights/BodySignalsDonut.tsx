import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { G, Circle, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const SIZE = 200;
const STROKE_WIDTH = 25;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const data = [
  { label: "Mood", value: 30, color: "#6366f1" },
  { label: "Bloating", value: 31, color: "#818cf8" },
  { label: "Fatigue", value: 21, color: "#a5b4fc" },
  { label: "Acne", value: 17, color: "#c7d2fe" },
];

const BodySignalsDonut = () => {
  let totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentOffset = 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Body Signals</Text>
      <Text style={styles.subtitle}>Symptom distribution</Text>

      <View style={styles.chartContainer}>
        <Svg width={SIZE + 100} height={SIZE + 60} viewBox={`0 0 ${SIZE + 100} ${SIZE + 60}`}>
          <G x={(SIZE + 100) / 2} y={(SIZE + 60) / 2}>
            {data.map((item, index) => {
              const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * item.value) / totalValue;
              const angle = (currentOffset / totalValue) * 360;
              const rotation = angle - 90;
              
              // Calculate label position
              const labelAngle = (angle + (item.value / totalValue * 180)) * (Math.PI / 180) - Math.PI / 2;
              const labelX = (RADIUS + 35) * Math.cos(labelAngle);
              const labelY = (RADIUS + 35) * Math.sin(labelAngle);

              const element = (
                <G key={index}>
                  <Circle
                    cx="0"
                    cy="0"
                    r={RADIUS}
                    stroke={item.color}
                    strokeWidth={STROKE_WIDTH}
                    fill="transparent"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(${rotation})`}
                  />
                  
                  <G x={labelX} y={labelY}>
                    <Circle r="14" fill="white" stroke={item.color} strokeWidth="1" />
                    <SvgText
                      fill={item.color}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      dy="3"
                    >
                      {item.value}%
                    </SvgText>
                  </G>
                </G>
              );
              currentOffset += item.value;
              return element;
            })}
          </G>
        </Svg>
      </View>

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
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
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#4b5563",
  },
});

export default BodySignalsDonut;