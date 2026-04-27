import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { G, Circle, Text as SvgText } from "react-native-svg";
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  withDelay,
  FadeInUp
} from "react-native-reanimated";
import { Colors, Shadows } from "../../constants/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 200;
const STROKE_WIDTH = 25;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const data = [
  { label: "Mood", value: 30, color: Colors.coral },
  { label: "Bloating", value: 31, color: Colors.lavender },
  { label: "Fatigue", value: 21, color: Colors.yellow },
  { label: "Acne", value: 17, color: Colors.mint },
];

const DonutSegment = ({ item, totalValue, currentOffset, index }: any) => {
  const animatedStroke = useSharedValue(CIRCUMFERENCE);
  
  useEffect(() => {
    animatedStroke.value = withDelay(
      500 + index * 100,
      withTiming(CIRCUMFERENCE - (CIRCUMFERENCE * item.value) / totalValue, { duration: 1000 })
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedStroke.value,
  }));

  const angle = (currentOffset / totalValue) * 360;
  const rotation = angle - 90;
  
  const labelAngle = (angle + (item.value / totalValue * 180)) * (Math.PI / 180) - Math.PI / 2;
  const labelX = (RADIUS + 35) * Math.cos(labelAngle);
  const labelY = (RADIUS + 35) * Math.sin(labelAngle);

  return (
    <G>
      <AnimatedCircle
        cx="0"
        cy="0"
        r={RADIUS}
        stroke={item.color}
        strokeWidth={STROKE_WIDTH}
        fill="transparent"
        strokeDasharray={CIRCUMFERENCE}
        animatedProps={animatedProps}
        transform={`rotate(${rotation})`}
        strokeLinecap="round"
      />
      <G x={labelX} y={labelY}>
        <Circle r="14" fill={Colors.white} stroke={item.color} strokeWidth="1" />
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
};

const BodySignalsDonut = () => {
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  let currentOffset = 0;

  return (
    <Animated.View 
      entering={FadeInUp.duration(600).delay(400)}
      style={[styles.container, Shadows.soft]}
    >
      <Text style={styles.title}>Body Signals</Text>
      <Text style={styles.subtitle}>Symptom distribution</Text>

      <View style={styles.chartContainer}>
        <Svg width={SIZE + 100} height={SIZE + 60} viewBox={`0 0 ${SIZE + 100} ${SIZE + 60}`}>
          <G x={(SIZE + 100) / 2} y={(SIZE + 60) / 2}>
            {data.map((item, index) => {
              const segment = (
                <DonutSegment 
                  key={index} 
                  item={item} 
                  totalValue={totalValue} 
                  currentOffset={currentOffset}
                  index={index}
                />
              );
              currentOffset += item.value;
              return segment;
            })}
            <SvgText
              fill={Colors.textPrimary}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              Daily signals
            </SvgText>
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
    color: Colors.textSecondary,
  },
});

export default BodySignalsDonut;