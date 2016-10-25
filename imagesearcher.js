
var searchInput = document.getElementById('textField');

class SearchPage extends React.Component {
  constructor() {
    super();

    this.state = {
      searchQuery: "cats",
      data: []
    };

    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.searchGetty = this.searchGetty.bind(this);
  }

  onDataLoaded(data) {
    const parsedSearchData = JSON.parse(data.currentTarget.response).images;
    this.setState({data: parsedSearchData});
    this.render();
  }

  searchGetty() {
    const query = document.getElementById("textField").value;
    this.state.searchQuery = query;
    var oReq = new XMLHttpRequest();

    oReq.addEventListener('load', this.onDataLoaded);
    oReq.open('GET', this.props.searchUrl + this.state.searchQuery);
    oReq.setRequestHeader('Api-Key', 'ksewve2mew2azjbecvjv6v9s');
    oReq.send();
  }

  render() {
    return (
      <div>
        <div id="searchbar">
          <div>Search for...
            <input type="text" name="searchfor" id="textField"
            className="searchComponents"></input>
            <button id="searchButton" className="searchComponents"
            onClick={this.searchGetty} >Search</button>
          </div>
        </div>
        <ResultList data={this.state.data} />
      </div>
    );
  }
}

SearchPage.defaultProps = {
  data: []
}
SearchPage.defaultProps = {
  data: React.PropTypes.array
}

class ResultList extends React.Component {
  render() {
    const resultListNode = this.props.data.map((dataItem) => {
      return(
        <ResultItem
          imageSource={dataItem.display_sizes[0].uri}
          alt={dataItem.caption}
          key={dataItem.id}
        />
      )
    })
    return (
      <div id="main">
      {resultListNode}
      </div>
    )
  }
}

class ResultItem extends React.Component {
  render() {
    return (
      <div>
        <img
        className="result"
        src={this.props.imageSource}
        alt={this.props.alt}
        ></img>
      </div>
    )
  }
}

ReactDOM.render(
  <SearchPage searchUrl='https://api.gettyimages.com/v3/search/images?phrase=' />,
  document.getElementById("root")
);