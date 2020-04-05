import "chartjs-plugin-annotation";
import React from "react";
import { Line } from "react-chartjs-2";
import TWITTER_SENTIMENT_DATA from "./twitterSentiment";

const createAnnotation = (date, label) => ({
  type: "line",
  mode: "vertical",
  scaleID: "x-axis-0",
  value: date,
  borderColor: "orange",
  borderWidth: 3,
  borderDash: [15, 2],
  label: {
    content: label,
    enabled: true,
    position: "top",
  },
});

const CHART_OPTIONS = {
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    ],
  },
};

const INDEXES = {
  disease: {
    diseaseIndex: {
      label: "Disease index",
      borderColor: "rgba(75,192,192,1)",
    },
    health: {
      label: "Health index",
      borderColor: "rgba(255,77,77,1)",
    },
    death: {
      label: "Death index",
      borderColor: "rgba(0,204,0, 1)",
    },
    bio: {
      label: "Bio index",
      borderColor: "rgba(0,102,255,1)",
    },
    body: {
      label: "Body index",
      borderColor: "rgba(153,51,255,1)",
    },
  },
  emotion: {
    emotionIndex: {
      label: "Emotion index",
      borderColor: "rgba(153, 102, 0,1)",
    },
    feel: {
      label: "Feel index",
      borderColor: "rgba(255,77,77,1)",
    },
    negemo: {
      label: "Negemo index",
      borderColor: "rgba(0,204,0, 1)",
    },
    affect: {
      label: "Affect index",
      borderColor: "rgba(0,102,255,1)",
    },
    anger: {
      label: "Anger index",
      borderColor: "rgba(153,51,255,1)",
    },
    sweat: {
      label: "Sweat index",
      borderColor: "rgba(204, 51, 153,1)",
    },
    anxiety: {
      label: "Anxiety index",
      borderColor: "rgba(204, 102, 0,1)",
    },
    sad: {
      label: "Sad index",
      borderColor: "rgba(192, 192, 192,1)",
    },
    posemo: {
      label: "Posemo index",
      borderColor: "rgba(0, 102, 153,1)",
    },
  },
  relation: {
    relationIndex: {
      label: "Relation index",
      borderColor: "rgba(0, 102, 153,1)",
    },
    friend: {
      label: "Friend index",
      borderColor: "rgba(255,77,77,1)",
    },
    family: {
      label: "Family index",
      borderColor: "rgba(0,204,0,1)",
    },
    social: {
      label: "Social index",
      borderColor: "rgba(0,102,255,1)",
    },
  },
  economy: {
    economyIndex: {
      label: "Economy index",
      borderColor: "rgba(0,102,255,1)",
    },
    money: {
      label: "Money index",
      borderColor: "rgba(255,77,77,1)",
    },
    work: {
      label: "Work index",
      borderColor: "rgba(0,204,0,1)",
    },
  },
  political: {
    politicalIndex: {
      label: "Political index",
      borderColor: "rgba(204, 51, 153,1)",
    },
    power: {
      label: "Power index",
      borderColor: "rgba(255,77,77,1)",
    },
    cause: {
      label: "Cause index",
      borderColor: "rgba(0,204,0, 1)",
    },
    certain: {
      label: "Certain index",
      borderColor: "rgba(0,102,255,1)",
    },
    insight: {
      label: "Insight index",
      borderColor: "rgba(153,51,255,1)",
    },
    compare: {
      label: "Compare index",
      borderColor: "rgba(192, 192, 192,1)",
    },
    risk: {
      label: "Risk index",
      borderColor: "rgba(204, 102, 0,1)",
    },
    interogate: {
      label: "Interogate index",
      borderColor: "rgba(153, 102, 0,1)",
    },
    future: {
      label: "Future index",
      borderColor: "rgba(0,204,0,1)",
    },
    number: {
      label: "Number index",
      borderColor: "rgba(0,102,255,1)",
    },
    relig: {
      label: "Religion index",
      borderColor: "rgba(255, 102, 255,1)",
    },
    tentat: {
      label: "Tentat index",
      borderColor: "rgba(255, 255, 26,1)",
    },
    quant: {
      label: "Quant index",
      borderColor: "rgba(153, 0, 0,1)",
    },
  },
};

const getDataSet = (upperCategoryKey, lowerCategoryKey, data) => ({
  label: INDEXES[upperCategoryKey][lowerCategoryKey].label,
  fill: false,
  lineTension: 0.1,
  backgroundColor: "rgba(75,192,192,0.4)",
  borderColor: INDEXES[upperCategoryKey][lowerCategoryKey].borderColor,
  borderCapStyle: "round",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(75,192,192,1)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data,
});

const initialState = {
  labels: [],
  datasets: [],
};

var createReactClass = require("create-react-class");

const Graph = createReactClass({
  displayName: "Graph",
  componentWillMount() {
    this.setState(initialState);
  },
  componentDidMount() {
    var dates = Object.keys(TWITTER_SENTIMENT_DATA);
    var upperCategories = Object.keys(this.props.indexTypes);

    const datasets = upperCategories.reduce((acc, upperCategoryKey) => {
      const lowerCategories = this.props.indexTypes[upperCategoryKey];
      const dataset = lowerCategories.map((lowerCategoryKey) => {
        const data = dates.map(
          (date) =>
            TWITTER_SENTIMENT_DATA[date][upperCategoryKey][lowerCategoryKey]
        );
        return getDataSet(upperCategoryKey, lowerCategoryKey, data);
      });
      return [...acc, ...dataset];
    }, []);

    var newState = {
      ...initialState,
      labels: dates,
      datasets,
    };

    this.setState(newState);
  },

  render() {
    const { timelineLabels } = this.props;
    const annotations = timelineLabels
      ? timelineLabels.map(({ date, label }) => createAnnotation(date, label))
      : [];
    const options = {
      ...CHART_OPTIONS,
      annotation: {
        annotations,
      },
    };
    return <Line data={this.state} options={options} />;
  },
});

class TwitterIndex extends React.Component {
  render() {
    return (
      <div>
        <Graph
          indexTypes={this.props.indexTypes}
          timelineLabels={this.props.timelineLabels}
        />
      </div>
    );
  }
}

export default TwitterIndex;