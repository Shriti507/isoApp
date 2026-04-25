import { HealthPalette } from "./theme";

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
    stroke: HealthPalette.indigo,
  },
  propsForBackgroundLines: {
    strokeDasharray: "", 
    stroke: "#f3f4f6",
  },
};

export const indigoChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  propsForDots: { ...chartConfig.propsForDots, stroke: HealthPalette.indigo },
};

export const coralChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(255, 138, 113, ${opacity})`,
  propsForDots: { ...chartConfig.propsForDots, stroke: HealthPalette.coral },
};

export const mintChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(74, 222, 128, ${opacity})`,
  propsForDots: { ...chartConfig.propsForDots, stroke: HealthPalette.mint },
};

export const lavenderChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(192, 132, 252, ${opacity})`,
  propsForDots: { ...chartConfig.propsForDots, stroke: HealthPalette.lavender },
};

export const yellowChartConfig = {
  ...chartConfig,
  color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`,
  propsForDots: { ...chartConfig.propsForDots, stroke: HealthPalette.yellow },
};