import { Colors } from "./colors";

export const baseChartConfig = {
  backgroundGradientFrom: Colors.white,
  backgroundGradientTo: Colors.white,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(124, 131, 253, ${opacity})`, // Indigo default
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, // textSecondary
  strokeWidth: 2,
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: Colors.indigo,
  },
  propsForBackgroundLines: {
    strokeDasharray: "", 
    stroke: Colors.graySoft,
  },
};

export const getChartConfig = (primaryColor: string) => ({
  ...baseChartConfig,
  color: (opacity = 1) => {
    // If it's a hex color, we need to convert or just use it
    // react-native-chart-kit often expects a function
    return hexToRgba(primaryColor, opacity);
  },
  propsForDots: {
    ...baseChartConfig.propsForDots,
    stroke: primaryColor,
  },
});

// Helper function to convert hex to rgba
function hexToRgba(hex: string, opacity: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}