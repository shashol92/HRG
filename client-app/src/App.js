import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: [], loading: false };
  }

  callApi() {
    fetch("http://localhost:9000/users/getAllUsers")
      .then(response => response.json())
      .then(result => this.setState({ apiResponse: result.users }))
  }
  
  componentDidMount() {
    this.callApi();
  }

  render() {
    const style = {
      backgroundColor: "lightblue",
      border:"1px solid black",
      padding: "10px",
      fontFamily: "Arial"
    }
    return (
      <div>
        {this.state.apiResponse.map((item, index) => (
          <div key={index} style={style}>
            <li>UserId: {item.userId}</li>
            <dl>
              <dd>- <b>Name:</b> {item.name}</dd>
              <dd>- <b>Username:</b> {item.username}</dd>
              <dd>- <b>Email:</b> {item.email}</dd>
              <dd>- <b>Phone:</b> {item.phone}</dd>
              <dd>- <b>Website:</b> {item.website}</dd>
              <dd>- <b>Address:</b> 
                <dd> Street: {item.address.street}</dd>
                <dd> Suite: {item.address.suite}</dd>
                <dd> City: {item.address.city}</dd>
                <dd> Zipcode: {item.address.zipcode}</dd>
                <dd>Geo: 
                  <dd>Latitude: {item.address.geo.lat}</dd>
                  <dd>Langitude: {item.address.geo.lng}</dd>
                </dd>
              </dd>
              <dd>- <b>Company:</b> 
                <dd> Name: {item.company.name}</dd>
                <dd> catchPhrase: {item.company.catchPhrase}</dd>
                <dd> Bs: {item.company.bs}</dd>
              </dd>
            </dl>
          </div>

        ))}
      </div>
    )
  }
}

export default App;
