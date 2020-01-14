import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import axios from "axios";

function RespList(props) {
  return (
    <div>
      <ul>
        {props.resps.map((resp, key) => {
          return (
            <li key={key}>
              <a className="list" href={resp.html_url}>
                {resp.name}
              </a>
              {" Владелец: "}
              <div className="owner">{resp.owner.login}</div>
              {" Forks: "}
              <div className="list">{resp.forks}</div>
              {" Stars: "}
              <div className="list">{resp.stargazers_count}</div>
              <img
                className="avatar"
                src={resp.owner.avatar_url}
                width="70"
                height="auto"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resps: [],
      param: "",
      page: 0,
      si: 0
    };

    this.loadInfo = this.loadInfo.bind(this);
  }

  async loadInfo() {
    let param = document.getElementById("value").value;
    if (!param) alert("Введите строку поиска");
    let typesort = localStorage.getItem("type");
    let si = this.state.page * 10;
    let page = this.state.page + 1;

    let result = await axios.get(
      "https://api.github.com/search/repositories?sience=" +
        si +
        "&q=" +
        param +
        "&sort=" +
        typesort +
        "&page=" +
        page +
        "&per_page=10"
    );
    result = result.data.items;
    this.setState(() => {
      return { resps: result };
    });
    console.log(result);
  }

  prev() {
    if (this.state.page === 0) {
      alert("Вы на первой странице");
    } else
      this.setState(() => {
        return { page: this.state.page - 1 };
      });
    this.loadInfo();
  }

  next() {
    this.setState(() => {
      return { page: this.state.page + 1 };
    });
    this.loadInfo();
  }

  render() {
    return (
      <div>
        <h3>Лабораторная работа №10</h3>

        <h4>Введите строку поиска</h4>
        <input id="value" />
        <h4>Выберите один из двух типов сортировки</h4>
        <button
          type="Submit"
          onClick={() => {
            localStorage.clear();
            localStorage.setItem("type", "stars");
          }}
        >
          stars
        </button>
        <button
          type="Submit"
          onClick={() => {
            localStorage.clear();
            localStorage.setItem("type", "forks");
          }}
        >
          forks
        </button>

        <button type="Submit" onClick={() => this.loadInfo()}>
          Получить данные
        </button>
        <RespList resps={this.state.resps} />
        <button type="Submit" onClick={() => this.prev()}>
          prev
        </button>
        <button type="Submit" onClick={() => this.next()}>
          next
        </button>

        <h4>Текущая страница {this.state.page}</h4>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
