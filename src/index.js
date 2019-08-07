import React from "react";
import ReactDOM from "react-dom";
import { Howl } from "howler";
import "./styles.css";

var sound = new Howl({
  src: ["pop.m4a"],
  volume: 0.5
});

class BLOCK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      c: 0
    };
    window.setTimeout(() => {
      if (props.root) {
        this.setState({ c: 0 });
      } else {
        let k = 0.2;
        if (this.props.d < 2) {
          k += 0.3;
        }
        if (this.props.d < 8) {
          k += 0.3;
        }
        this.setState({
          c:
            (Math.round(Math.random()) + Math.round(Math.random())) *
            Math.min(Math.round(Math.random() + k), 1.0)
        });
      }
      sound.play();
    }, 100);
  }
  render() {
    let { d } = this.props;
    let { c } = this.state;
    d = d || 0;

    if (d > 30) {
      return "🌝";
    }
    return (
      <div
        onClick={e => {
          this.setState({ clicked: "true" });
          this.setState(({ c }) => {
            let newc = c + 1;
            if (newc === 1) {
              newc += Math.round(Math.random());
            }
            return { c: newc % 3 };
          });

          sound.play();
          e.stopPropagation();
        }}
        className={`block ${c > 2 && "full"}`}
        style={{ backgroundColor: `hsla(${(d * 255) / 5},30%,80%,1.0)` }}
      >
        {d === 0 && c === 0 && "click here to initialize  🅗🅨🅟🅔🅡 🅟🅞🅟  "}
        {c > 0 && <BLOCK d={d + 1} />}
        {c > 1 && <BLOCK d={d + 1} />}
        {c > 2 && <BLOCK d={d + 1} />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<BLOCK root />, rootElement);
