import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const COLORS = {
  background: '#f7f3ef',
  card: '#fffdfc',
  ink: '#1d1d1f',
  muted: '#8b8883',
  sageDark: '#6c8674',
  rose: '#e9a0a7',
  border: '#ece6e1',
  grid: '#e9e3de',
  tab: '#d9d4cf',
} as const;

const cycleData = [
  { label: 'Jan', top: 18, green: 0.76, pink: 0.24 },
  { label: 'Feb', top: 20, green: 0.88, pink: 0.12 },
  { label: 'Mar', top: 18, green: 0.8, pink: 0.2 },
  { label: 'Apr', top: 23, green: 0.84, pink: 0.16 },
  { label: 'May', top: 20, green: 0.83, pink: 0.17 },
  { label: 'Jun', top: 18, green: 0.79, pink: 0.21 },
];

const weightData = [30, 45, 52, 44, 31, 40, 82, 118, 132, 126, 98, 96];

const symptomSegments = [
  { label: 'Mood', value: 30, color: '#f2c9c7' },
  { label: 'Bloating', value: 31, color: '#d9d2fb' },
  { label: 'Fatigue', value: 22, color: '#f0a7a5' },
  { label: 'Acne', value: 17, color: '#bcd1c0' },
];

const impactRows = [
  { label: 'Sleep', cells: [0.84, 0.72, 0.6, 0.52, 0.45, 0.38, 0.18] },
  { label: 'Mood', cells: [0.28, 0.42, 0.62, 0.74, 0.46, 0.24, 0.14] },
  { label: 'Diet', cells: [0.66, 0.58, 0.49, 0.2, 0.12, 0.08, 0.05] },
  { label: 'Stress', cells: [0.34, 0.46, 0.41, 0.27, 0.16, 0.12, 0.09] },
  { label: 'Exercise', cells: [0.55, 0.48, 0.32, 0.2, 0.13, 0.1, 0.06] },
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function SectionTitle({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

function Pill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </View>
  );
}

function TextLabel({
  x,
  y,
  label,
  color = COLORS.muted,
  size = 8,
}: {
  x: number;
  y: number;
  label: string;
  color?: string;
  size?: number;
}) {
  return (
    <SvgText x={x} y={y} fill={color} fontSize={size}>
      {label}
    </SvgText>
  );
}

function StabilityChart() {
  const width = 240;
  const height = 100;
  const axisY = 72;
  const points = [
    { x: 30, y: 56, label: 'Jan' },
    { x: 82, y: 49, label: 'Feb' },
    { x: 134, y: 34, label: 'Mar' },
    { x: 188, y: 42, label: 'Apr' },
  ];

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="stabilityFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#dad2ff" stopOpacity="0.1" />
          <Stop offset="64%" stopColor="#cec4ff" stopOpacity="0.88" />
          <Stop offset="100%" stopColor="#c7baff" stopOpacity="0.55" />
        </LinearGradient>
      </Defs>

      {[0, 1, 2].map((tick) => (
        <Line
          key={tick}
          x1="18"
          y1={24 + tick * 20}
          x2="224"
          y2={24 + tick * 20}
          stroke={COLORS.grid}
          strokeWidth="1"
        />
      ))}

      <Path
        d="M 88 69 C 112 66, 128 61, 146 52 C 162 44, 177 36, 197 28 L 197 78 L 88 78 Z"
        fill="url(#stabilityFill)"
      />

      {points.map((item) => (
        <G key={item.label}>
          <Line
            x1={item.x}
            y1={axisY}
            x2={item.x}
            y2={item.y}
            stroke="#d8d3eb"
            strokeWidth="1.5"
          />
          <Circle cx={item.x} cy={item.y} r="3.7" fill={COLORS.sageDark} />
          <Circle
            cx={item.x}
            cy={item.y}
            r="6.8"
            fill="transparent"
            stroke={item.label === 'Mar' ? '#d3ccfb' : 'transparent'}
            strokeWidth="2"
          />
          <TextLabel x={item.x - 8} y={91} label={item.label} />
        </G>
      ))}

      <TextLabel x={4} y={68} label="2nd" />
      <TextLabel x={4} y={48} label="3rd" />
      <TextLabel x={4} y={28} label="4th" />

      <G x={104} y={6}>
        <Rect width="62" height="30" rx="7" fill="#111111" />
        <SvgText x={31} y={13} fill="#ffffff" fontSize="7.5" textAnchor="middle">
          Stability
        </SvgText>
        <SvgText x={31} y={23} fill="#ffffff" fontSize="7.5" textAnchor="middle">
          Improving
        </SvgText>
      </G>
    </Svg>
  );
}

function CycleTrendsChart() {
  return (
    <View style={styles.cycleChart}>
      {cycleData.map((item) => (
        <View key={item.label} style={styles.cycleColumn}>
          <Text style={styles.cycleTopLabel}>{item.top}</Text>
          <View style={styles.cycleStem}>
            <View
              style={[
                styles.cycleTopSegment,
                { flex: item.green, backgroundColor: COLORS.sageDark },
              ]}
            />
            <View
              style={[
                styles.cycleBottomSegment,
                { flex: item.pink, backgroundColor: COLORS.rose },
              ]}
            />
            <View
              style={[
                styles.cycleMarker,
                { top: `${Math.max(14, item.green * 58)}%` as any },
              ]}
            />
          </View>
          <Text style={styles.cycleMonthLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function WeightChart({ width }: { width: number }) {
  const height = 126;
  const paddingX = 10;
  const chartW = width - 20;
  const max = Math.max(...weightData);
  const min = Math.min(...weightData);
  const range = max - min;

  const points = weightData
    .map((value, index) => {
      const x = paddingX + (index * chartW) / (weightData.length - 1);
      const y = 14 + ((max - value) / range) * 84;
      return `${x},${y}`;
    })
    .join(' ');

  const area = `${points} ${paddingX + chartW},112 ${paddingX},112`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#f3b8b4" stopOpacity="0.45" />
          <Stop offset="100%" stopColor="#f3b8b4" stopOpacity="0.04" />
        </LinearGradient>
      </Defs>

      {[0, 1, 2].map((line) => (
        <Line
          key={line}
          x1="10"
          y1={24 + line * 28}
          x2={width - 10}
          y2={24 + line * 28}
          stroke={COLORS.grid}
          strokeWidth="1"
        />
      ))}

      <Path d={`M ${area}`} fill="url(#weightFill)" />
      <Path
        d={`M ${points}`}
        stroke="#eaa4a5"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {weightData.map((value, index) => {
        const x = paddingX + (index * chartW) / (weightData.length - 1);
        const y = 14 + ((max - value) / range) * 84;
        if (index % 2 !== 0) return null;
        return <Circle key={index} cx={x} cy={y} r="2.5" fill="#eaa4a5" />;
      })}

      {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => (
        <TextLabel key={month} x={18 + index * ((width - 40) / 4)} y={122} label={month} />
      ))}
      <TextLabel x={0} y={102} label="26" />
      <TextLabel x={0} y={70} label="70" />
      <TextLabel x={0} y={38} label="90" />
    </Svg>
  );
}

function BodySignalsChart() {
  const size = 210;
  const strokeWidth = 24;
  const radius = 62;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  let startAngle = 0;

  return (
    <View style={styles.bodySignalsWrap}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#f0ece9"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {symptomSegments.map((segment) => {
          const sweep = (segment.value / 100) * 360;
          const path = describeArc(center, center, radius, startAngle, startAngle + sweep);
          startAngle += sweep + 3;
          return (
            <Path
              key={segment.label}
              d={path}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
            />
          );
        })}
      </Svg>

      <View style={styles.signalBadgeLeftTop}>
        <SignalBadge value="30%" label="Mood" />
      </View>
      <View style={styles.signalBadgeRightTop}>
        <SignalBadge value="31%" label="Bloating" />
      </View>
      <View style={styles.signalBadgeLeftBottom}>
        <SignalBadge value="17%" label="Acne" />
      </View>
      <View style={styles.signalBadgeRightBottom}>
        <SignalBadge value="22%" label="Fatigue" />
      </View>
    </View>
  );
}

function SignalBadge({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.signalBadge}>
      <Text style={styles.signalValue}>{value}</Text>
      <Text style={styles.signalLabel}>{label}</Text>
    </View>
  );
}

function ImpactHeatmap() {
  return (
    <View>
      <View style={styles.impactHeaderRow}>
        <Text style={styles.impactLabelSmall}>High</Text>
        <Text style={styles.impactLabelSmall}>4 months</Text>
      </View>

      {impactRows.map((row) => (
        <View key={row.label} style={styles.impactRow}>
          <Text style={styles.impactRowLabel}>{row.label}</Text>
          <View style={styles.impactCells}>
            {row.cells.map((value, index) => {
              const backgroundColor =
                row.label === 'Sleep'
                  ? `rgba(180, 166, 239, ${value})`
                  : row.label === 'Mood'
                    ? `rgba(230, 178, 181, ${value})`
                    : row.label === 'Diet'
                      ? `rgba(159, 186, 172, ${value})`
                      : row.label === 'Stress'
                        ? `rgba(235, 163, 160, ${value})`
                        : `rgba(201, 215, 204, ${value})`;

              return (
                <View
                  key={`${row.label}-${index}`}
                  style={[styles.impactCell, { backgroundColor }]}
                />
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

function BottomTabBar() {
  const tabs = [
    { label: 'Home', active: false },
    { label: 'Track', active: false },
    { label: 'Insights', active: true },
  ];

  return (
    <View style={styles.bottomBar}>
      {tabs.map((tab) => (
        <View key={tab.label} style={styles.tabItem}>
          <View style={[styles.tabIcon, tab.active && styles.tabIconActive]} />
          <Text style={[styles.tabLabel, tab.active && styles.tabLabelActive]}>{tab.label}</Text>
        </View>
      ))}
      <View style={styles.plusButton}>
        <Text style={styles.plusText}>+</Text>
      </View>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageLabel}>Stability Summary</Text>

        <View style={[styles.card, styles.heroCard]}>
          <Text style={styles.supportingText}>
            Based on your recent logs and symptom patterns.
          </Text>
          <Text style={styles.cardHeading}>Stability Score</Text>
          <Text style={styles.heroScore}>78%</Text>
          <StabilityChart />
        </View>

        <Text style={styles.pageLabel}>Cycle Trends</Text>
        <View style={styles.card}>
          <CycleTrendsChart />
        </View>

        <Text style={styles.pageLabel}>Body & Metabolic Trends</Text>
        <View style={styles.card}>
          <SectionTitle
            title="Your weight"
            subtitle="In kg"
            right={
              <View style={styles.toggleRow}>
                <Pill label="Monthly" active />
                <Pill label="Weekly" />
              </View>
            }
          />
          <WeightChart width={cardWidth - 28} />
        </View>

        <Text style={styles.pageLabel}>Body Signals</Text>
        <View style={styles.card}>
          <SectionTitle title="Symptom Trends" subtitle="Compared to last cycle" />
          <BodySignalsChart />
        </View>

        <Text style={styles.pageLabel}>Lifestyle Impact</Text>
        <View style={styles.card}>
          <SectionTitle title="Correlation Strength" />
          <ImpactHeatmap />
        </View>
      </ScrollView>

      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.ink,
    letterSpacing: 0.1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 108,
  },
  pageLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 8,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(235, 228, 222, 0.7)',
    padding: 14,
    marginBottom: 16,
    shadowColor: '#d7cdc6',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  heroCard: {
    paddingBottom: 10,
  },
  supportingText: {
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 10,
    lineHeight: 13,
  },
  cardHeading: {
    fontSize: 12,
    color: COLORS.ink,
    marginBottom: 2,
  },
  heroScore: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.ink,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#efebe7',
  },
  pillActive: {
    backgroundColor: '#1d1d1f',
  },
  pillText: {
    fontSize: 8.5,
    color: COLORS.muted,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#ffffff',
  },
  cycleChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  cycleColumn: {
    alignItems: 'center',
    width: 36,
  },
  cycleTopLabel: {
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 4,
  },
  cycleStem: {
    width: 8,
    height: 96,
    borderRadius: 8,
    backgroundColor: '#efeae6',
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  cycleTopSegment: {
    width: '100%',
  },
  cycleBottomSegment: {
    width: '100%',
  },
  cycleMarker: {
    position: 'absolute',
    left: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cfc9eb',
    backgroundColor: 'transparent',
  },
  cycleMonthLabel: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 4,
  },
  bodySignalsWrap: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  signalBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    shadowColor: '#d8d0ca',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  signalValue: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.ink,
  },
  signalLabel: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 2,
  },
  signalBadgeLeftTop: {
    position: 'absolute',
    left: 8,
    top: 32,
  },
  signalBadgeRightTop: {
    position: 'absolute',
    right: 4,
    top: 38,
  },
  signalBadgeLeftBottom: {
    position: 'absolute',
    left: 12,
    bottom: 30,
  },
  signalBadgeRightBottom: {
    position: 'absolute',
    right: 8,
    bottom: 26,
  },
  impactHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  impactLabelSmall: {
    fontSize: 8,
    color: COLORS.muted,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  impactRowLabel: {
    width: 42,
    fontSize: 8,
    color: COLORS.muted,
  },
  impactCells: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  impactCell: {
    width: 19,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#ede7e3',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 18,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.tab,
  },
  tabIconActive: {
    backgroundColor: COLORS.ink,
  },
  tabLabel: {
    fontSize: 9,
    color: COLORS.muted,
  },
  tabLabelActive: {
    color: COLORS.ink,
    fontWeight: '600',
  },
  plusButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f2efeb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -4,
  },
  plusText: {
    fontSize: 24,
    lineHeight: 24,
    color: COLORS.muted,
    marginTop: -1,
  },
});
