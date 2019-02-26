import React from 'react';


class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleLoad = this._handleLoad.bind(this);
    }


    _handleInputChange(event) {
        this.setState({ keyword: event.target.value });
    };
    _handleSubmit(event) {
        event.preventDefault();       
        this._handleLoad();
    }
    async _handleLoad() {
        return await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&nex`)
            .then(response => {
                return response.json({
                    message: "success"
                })
            }).then((result) => {
                console.log("result: ", result);
                this.props.getVideoItems(result.items);
            }).catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="form">
                <form id="search" className="my-5" onSubmit={this._handleSubmit} >
                    <div className="form-group">
                        <input type="text" value={this.state.keyword} onChange={this._handleInputChange} className="form-control" />
                        <br />
                        <input type="submit" className="btn btn-primary form-control" value="Submit" />
                    </div>

                </form>

            </div>

        );
    }
}

export default SearchForm; 