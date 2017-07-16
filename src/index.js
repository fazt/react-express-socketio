import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages]})
    })
  }

  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages]})
      this.socket.emit('message', body)
      event.tañrget.value = ''
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.from}: {message.body}</b>
      </li>
    });

    return(
      <div>
        <h1>Hello World</h1>
        <input
            type="text"
            placeholder='Enter a message'
            onKeyUp={this.handleSubmit}/>
        {messages}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
