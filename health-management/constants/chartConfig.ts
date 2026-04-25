export const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#6366f1",
  },
  propsForBackgroundLines: {
    strokeDasharray: "", 
    stroke: "#f3f4f6",
  },
};

export const redChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(248, 113, 113, ${opacity})`,
  propsForDots: {
    ...chartConfig.propsForDots,
    stroke: "#f87171",
  },
};