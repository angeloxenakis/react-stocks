import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    displayStocks: [],
    portfolio: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({
      stocks: stocks,
      displayStocks: stocks
    }))
  }

  buyStock = (stock) => {
    if(!this.state.portfolio.includes(stock)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock]
      })
    }
  }

  sellStock = (stock) => {
    const updatedPortfolio = this.state.portfolio.filter(portStock => portStock !== stock)
    this.setState({
      portfolio: updatedPortfolio
    })
  }

  sortByAlpha = () => {
    const alphaStocks = this.state.stocks.sort((a,b) => a.name > b.name ? 1: -1)
    this.setState({
      displayStocks: alphaStocks
    })
  }

  sortByPrice = () => {
    const priceyStocks = this.state.stocks.sort((a,b) => b.price - a.price)
    this.setState({
      displayStocks: priceyStocks
    })
  }

  filterByType = (e) => {
    console.log("yo")
    const filteredStocks = this.state.stocks.filter(stock => stock.type === e.target.value)
    this.setState({
      displayStocks: filteredStocks
    })
  }

  render() {
    return (
      <div>
        <SearchBar sortByAlpha={this.sortByAlpha} sortByPrice={this.sortByPrice} filterByType={this.filterByType}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
