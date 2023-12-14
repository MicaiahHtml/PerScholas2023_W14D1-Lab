const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>Create a New Ship Log</h1>
                <form action="/logs" method="POST">
                    Title: <input type = "text" name = "title"/>
                    Entry: <input type = "text" name = "entry"/>
                    Is The Ship Broken? <input type = "checkbox" name="shipIsBroken"/>
                    <input type = "submit" value = "Create Ship Log"/>
                </form>
            </div>
        )
    }
}

module.exports = New;