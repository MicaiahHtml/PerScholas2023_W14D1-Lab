const React = require('react');

class Show extends React.Component {
    render() {
        const log = this.props.log;

        return (
            <div>
                <h1>Ship Log Show Page</h1>
                <h2>{log.title}</h2>
                <p>{log.entry}</p>
                <br/>
                <p>
                    {log.shipIsBroken ? `The ship is broken...`:`The ship is A-OKAY.`}
                </p>
                <a href = "/logs">Back</a>
            </div>
        )
    }
}

module.exports = Show;