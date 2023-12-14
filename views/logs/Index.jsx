const React = require('react');

class Index extends React.Component {
    render() {
        const { logs } = this.props;
        // const fruits = this.props.fruits;

        return (
            <div>
                <h1>Ship Logs Index Page</h1>
                <nav>
                    <a href="/logs/new">Create a New Log</a>
                </nav>
                <ul>
                    {logs.map((log, i) => {
                        return (
                            <li>
                                
                                <a href={`/logs/${log._id}`}>
                                    <h1>{log.title}</h1>
                                </a> 
                                <p>
                                 {log.entry}
                                </p>
                                <br/>
                                <p>
                                {log.shipIsBroken ? `The ship is broken...` : `The ship is A-OKAY.`}
                            </p>
                            <br />
                            <a href = {`/logs/${log._id}/edit`}> Edit this log</a>
                            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE" />
                            </form>
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;