import Cheeseboard from './Cheeseboard';


function App() {

  let data = [{
    stock_name: "EFX",
    company_name: "Equifax Inc",
    price: 163.55,
    currency: "USD",
    change: "+9.03"
  }, {
    stock_name: "IRM",
    company_name: "Iron Mountain Inc",
    price: 33.21,
    currency: "USD",
    change: "+1.42"
  }, {
    stock_name: "NTAP",
    company_name: "NetApp Inc",
    price: 54.81,
    currency: "USD",
    change: "-6.01"
  }, {
    stock_name: "CTL",
    company_name: "Centurylink Inc",
    price: 13.79,
    currency: "USD",
    change: "-1.37"
  }]

  let arr = new Array(8) //создаёт массив с заданным количеством пустых ячеек

  return (
    <div className="App" >
      <h1 align="center">Hello World!
      </h1>
      <h1 align="center">      {new Date().toLocaleDateString()} // используется для получения строкового представления даты 
</h1>
<br></br>

      <table align="center">
        <tbody>
          {data.map((argument) => {
            return (
              <tr align="center">
                <td>{argument.stock_name}</td>
                <td>{argument.company_name}</td>
                <td>{argument.price}</td>
                <td>{argument.currency}</td>
                <td style={+argument.change > 0 ? { color: "green" } : { color: "red" }}>{argument.change}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      

<br></br>
      <table align='center'>
        <Cheeseboard></Cheeseboard>
        {[...arr].map((_, i) => (
          <tr>
            <td>{8 - i}</td>
            {[...arr].map((_, j) => (
              <td
                style={{
                  background: i % 2 === j % 2 ? 'black' : 'white',
                  color: i % 2 === j % 2 ? 'black' : 'white',
                  padding: '14px 20px 14px 20px',
                  border: "1px solid black"
                }}
              >1</td>
            ))}
            <td>{8 - i}</td>
          </tr>
        ))}
        <Cheeseboard></Cheeseboard>
      </table>
    </div>
  );
}

export default App;

