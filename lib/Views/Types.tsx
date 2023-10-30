type DirectionCount = {
  "0-5": number;
  "5-10": number;
  "10-15": number;
  "15-20": number;
  "20-25": number;
};

export type CountClassify =
  | "angle"
  | "0-5"
  | "5-10"
  | "10-15"
  | "15-20"
  | "20-25";

export enum Direction {
  N = "N",
  NNE = "NNE",
  NE = "NE",
  ENE = "ENE",
  E = "E",
  ESE = "ESE",
  SE = "SE",
  SSE = "SSE",
  S = "S",
  SSW = "SSW",
  SW = "SW",
  WSW = "WSW",
  W = "W",
  WNW = "WNW",
  NW = "NW",
  NNW = "NNW"
}

export type Count = {
  N: DirectionCount;
  NNE: DirectionCount;
  NE: DirectionCount;
  ENE: DirectionCount;
  E: DirectionCount;
  ESE: DirectionCount;
  SE: DirectionCount;
  SSE: DirectionCount;
  S: DirectionCount;
  SSW: DirectionCount;
  SW: DirectionCount;
  WSW: DirectionCount;
  W: DirectionCount;
  WNW: DirectionCount;
  NW: DirectionCount;
  NNW: DirectionCount;
};

// export type Direction = typeof Direction[keyof typeof Direction];
// export type Direction = keyof typeof Direction;

// export const ChartPropTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       "0-1": PropTypes.number.isRequired,
//       "1-2": PropTypes.number.isRequired,
//       "2-3": PropTypes.number.isRequired,
//       "3-4": PropTypes.number.isRequired,
//       "4-5": PropTypes.number.isRequired,
//       "5-6": PropTypes.number.isRequired,
//       "6-7": PropTypes.number.isRequired,
//       "7+": PropTypes.number.isRequired,
//       angle: PropTypes.string.isRequired,
//       total: PropTypes.number.isRequired,
//     }).isRequired,
//   ).isRequired,
//   columns: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   width: PropTypes.number,
//   height: PropTypes.number,
// };

// export type DataType = DirectionCount & { angle: Direction; total: number }[];
// export type DataTypes = { [key: string]: number }[];

type Angle =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";
export type ChartData = {
  angle: Angle;
  "0-5": number;
  "5-10": number;
  "10-15": number;
  "15-20": number;
  "20-25": number;
  total: number;
};

export type Column = keyof ChartData;

export interface ChartPropTypes extends React.HTMLProps<HTMLDivElement> {
  // data: DirectionCount & { angle: Direction; total: number }[];
  chartData: ChartData[];
  // columns: string[];
  columns: string[];
  width: number;
  height: number;
  responsive: boolean;
  legendGap: number;
}

export const ChartDefaultProps: ChartPropTypes = {
  width: 600,
  height: 600,
  chartData: [
    {
      angle: "N",
      "0-5": 0.5,
      "5-10": 1.6,
      "10-15": 0.9,
      "15-20": 0.9,
      "20-25": 0.4,
      total: 4.8999999999999995
    },
    {
      angle: "NNE",
      "0-5": 0.6,
      "5-10": 1.8,
      "10-15": 1.3,
      "15-20": 0.8,
      "20-25": 0.5,
      total: 5.499999999999999
    },
    {
      angle: "NE",
      "0-5": 0.5,
      "5-10": 1.5,
      "10-15": 1.6,
      "15-20": 1.2,
      "20-25": 1.2,
      total: 6.799999999999999
    },
    {
      angle: "ENE",
      "0-5": 0.4,
      "5-10": 1.6,
      "10-15": 0.9,
      "15-20": 1,
      "20-25": 0.5,
      total: 4.8
    },
    {
      angle: "E",
      "0-5": 0.4,
      "5-10": 1.6,
      "10-15": 1,
      "15-20": 0.8,
      "20-25": 0.4,
      total: 4.499999999999999
    },
    {
      angle: "ESE",
      "0-5": 0.3,
      "5-10": 1.2,
      "10-15": 0.6,
      "15-20": 0.4,
      "20-25": 0.2,
      total: 2.95
    },
    {
      angle: "SE",
      "0-5": 0.4,
      "5-10": 1.5,
      "10-15": 0.6,
      "15-20": 0.5,
      "20-25": 0.4,
      total: 3.5499999999999994
    },
    {
      angle: "SSE",
      "0-5": 0.4,
      "5-10": 1.7,
      "10-15": 0.9,
      "15-20": 0.5,
      "20-25": 0.4,
      total: 4.1
    },
    {
      angle: "S",
      "0-5": 0.6,
      "5-10": 2.2,
      "10-15": 1.4,
      "15-20": 0.8,
      "20-25": 0.7,
      total: 5.949999999999999
    },
    {
      angle: "SSW",
      "0-5": 0.4,
      "5-10": 2,
      "10-15": 1.7,
      "15-20": 0.9,
      "20-25": 0.6,
      total: 5.949999999999999
    },
    {
      angle: "SW",
      "0-5": 0.5,
      "5-10": 2.3,
      "10-15": 1.9,
      "15-20": 1.3,
      "20-25": 0.7,
      total: 7.299999999999999
    },
    {
      angle: "WSW",
      "0-5": 0.6,
      "5-10": 2.4,
      "10-15": 2.2,
      "15-20": 1.1,
      "20-25": 0.8,
      total: 7.800000000000001
    },
    {
      angle: "W",
      "0-5": 0.6,
      "5-10": 2.3,
      "10-15": 1.8,
      "15-20": 1.2,
      "20-25": 1.2,
      total: 9.000000000000002
    },
    {
      angle: "WNW",
      "0-5": 0.5,
      "5-10": 2.6,
      "10-15": 1.7,
      "15-20": 1.2,
      "20-25": 1,
      total: 10.8
    },
    {
      angle: "NW",
      "0-5": 0.4,
      "5-10": 2.3,
      "10-15": 1.8,
      "15-20": 1.3,
      "20-25": 1,
      total: 9.9
    },
    {
      angle: "NNW",
      "0-5": 0.1,
      "5-10": 0.8,
      "10-15": 0.8,
      "15-20": 1,
      "20-25": 0.7,
      total: 4.300000000000001
    }
  ],
  columns: ["angle", "0-5", "5-10", "10-15", "15-20", "20-25"],
  responsive: false,
  legendGap: 10
};

export interface DataType {
  [key: string]: number; //  [key: string]: number | null;
}

export type DataTypes = typeof ChartDefaultProps;

interface State {
  width: number;
  height: number;
}

export interface PropType extends State {
  /**
   * Professionals respond to survey of how much they use a K-12 core competancy in each subject
   */
  data: DataType[];
  /**
   * Subjects
   */
  columns: string[];
  /**
   * Subjects colors
   */
  columnsColor: string[];
  /**
   * All core competency
   */
  angles: string[];
  /**
   * Max score
   */
  dataMax: number;
  /**
   * Target data keys
   */
  dataKeys: string[];
  /**
   * Mouse over Path color
   */
  mouseOverColor: string;
  /**
   * Mouse over competency text color
   */
  mouseOverTitleColor: string;
  /**
   * Mouseover survey score text color
   */
  mouseOverSurveyColor: string;
}
