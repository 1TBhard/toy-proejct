import React from "react";
import "./style.css";

const GOING = "GOING";
const STOP = "STOP";

const FIRST_SECTION_TIME = 25;
const FIRST_BREAK_TIME = 5;

const [SESSION_LABEL, BREAK_LABEL] = ["session", "break"];

// id, text, timeDown, timeUp
class TimeControll extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="btn-wrapper">
				<h2 id={this.props.idPrefix + "-label"}>{this.props.text}</h2>
				<div className="flex-wrapper">
					<button
						id={this.props.idPrefix + "-decrement"}
						onClick={this.props.timeDown}
					>
						Down
					</button>

					<h3 id={this.props.idPrefix + "-length"}>{this.props.time}</h3>

					<button
						id={this.props.idPrefix + "-increment"}
						onClick={this.props.timeUp}
					>
						Up
					</button>
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();

		/* prettier-ignore */
		this.state = {
			session: FIRST_SECTION_TIME,          // 세션 시간
			break: FIRST_BREAK_TIME,              // 쉬는 시간
			left: FIRST_SECTION_TIME * 60,        // 보여지는 타이머 시간
			currentMode: STOP,                    // 현재 시계의 상태(STOP, GOING)
			currentLabel: SESSION_LABEL,          // 타이머 시간이 어떤 시간인지(SESSIONLABEL, BREAKLABEL)
			goingTime: "",                        // 시계를 흐르게 하는 변수
    };

		this.alarm = React.createRef();

		this.handleInitTime = this.handleInitTime.bind(this);
		this.printTime = this.printTime.bind(this);
		this.handleStartStopTime = this.handleStartStopTime.bind(this);
		this.resetTime = this.resetTime.bind(this);
		this.playAlarm = this.playAlarm.bind(this);
		this.beforeOneMinAlarm = this.beforeOneMinAlarm.bind(this);
	}

	handleInitTime(name, value) {
		// 다음 계산되는 값
		const nextValue =
			this.state[name] + value < 1 || this.state[name] + value > 60
				? this.state[name]
				: Math.floor(this.state[name] + value);

		// 현재 시간이 멈추지 않으면 시간 설정 못함
		if (this.state.currentMode !== STOP) {
			return false;
		}

		if (this.state.currentLabel === name) {
			this.setState({
				[name]: nextValue,
				left: nextValue * 60,
			});
		} else {
			this.setState({
				[name]: nextValue,
			});
		}
	}

	printTime(t) {
		const mm = Math.floor(t / 60);
		const ss = Math.floor(t % 60);
		return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? "0" + ss : ss}`;
	}

	handleStartStopTime() {
		switch (this.state.currentMode) {
			// 시계 시간 멈춰있을 때, 다시 움직이게함
			case STOP:
				this.setState({
					goingTime: setInterval(() => {
						if (this.state.left <= 0) {
							this.playAlarm();

							// 다음 바뀌어야할 라벨
							const nextLabel =
								this.state.currentLabel === SESSION_LABEL
									? BREAK_LABEL
									: SESSION_LABEL;

							this.setState((state) => ({
								left: state.break * 60,
								currentLabel: nextLabel,
							}));

							return;
						}
						this.setState((state) => ({
							left: state.left - 1,
						}));
					}, 1000),
					currentMode: GOING,
				});
				break;

			// 시계 시간 흐르고 있을때, 시간 정지
			case GOING:
				clearInterval(this.state.goingTime);
				this.setState({
					goingTime: "",
					currentMode: STOP,
				});
				break;
		}
	}

	// 타이머 리셋
	resetTime() {
		this.alarm.current.pause();
		this.alarm.current.currentTime = 0;

		// 시간 흐르고 있는 경우 정지
		if (this.state.currentMode === GOING) {
			clearInterval(this.state.goingTime);
		}

		this.setState({
			session: FIRST_SECTION_TIME,
			break: FIRST_BREAK_TIME,
			left: FIRST_SECTION_TIME * 60,
			currentMode: STOP,
			currentLabel: SESSION_LABEL,
			goingTime: "",
		});
	}

	// 알람 1분전 시계 컬러 변경
	beforeOneMinAlarm() {
		const alertStyle = {
			color: "#CD7672",
		};

		return this.state.left < 60 ? alertStyle : null;
	}

	// 알람 울림
	playAlarm() {
		const alarmDom = this.alarm.current;
		alarmDom.play();
	}

	render() {
		return (
			<div className="App">
				<h1 id="main-title">Pomodoro Timer</h1>
				<div className="flex-wrapper">
					<TimeControll
						idPrefix="break"
						text="Break Length"
						time={this.state.break}
						timeDown={() => this.handleInitTime("break", -1)}
						timeUp={() => this.handleInitTime("break", 1)}
					/>

					<TimeControll
						idPrefix="session"
						text="Session Length"
						time={this.state.session}
						timeDown={() => this.handleInitTime("session", -1)}
						timeUp={() => this.handleInitTime("session", 1)}
					/>
				</div>

				<div id="timer-display">
					<h2 id="timer-label">{this.state.currentLabel}</h2>
					<div id="time-left" style={this.beforeOneMinAlarm()}>
						{this.printTime(this.state.left)}
					</div>
				</div>

				<div id="controller">
					<button id="start_stop" onClick={this.handleStartStopTime}>
						start / stop
					</button>
					<button id="reset" onClick={this.resetTime}>
						reset
					</button>
					<audio
						ref={this.alarm}
						id="beep"
						preload="auto"
						src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
					/>
				</div>
			</div>
		);
	}
}

export default App;
