
class CreateCampaign extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.children = [];
        this.state.props = this.state.props.props;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let campaign = {
            desc: $("#desc").val(),
            name: $("#name").val(),
            info: {
                year: $("#year").val(),
                location: $("#location").val(),
                paused: true,
                players: 1
            },
            author: auth.currentUser.uid
        }

       db.collection("campaigns").add(campaign).then(e => {
            db.collection(`users/${auth.currentUser.uid}/campaigns`).add({
                ref: db.doc(e.path),
                running: false
            }).then(e2 => {
                localStorage.setItem("renderCampaign", e.path)
                window.location.href = window.location.origin + "/campaign";
            })
       });
    }

    render() {
        let possible_rarities = ["divine", "legendary", "mythic", "epic", "rare", "uncommon", "common"];

        return (
            <div className="item_page_dynamic">
                <div className="header_content item_dynamic vertical">
                    <h1 style={{ margin: '0' }}>Create a Campaign</h1>

                    <div className="linear width100" style={{  width: '100%', height: '100%', padding: '35px' }}>
                        <div id="inputs" className="vertical">
                            <h3 style={ { margin: '15px' } }>NAME</h3>
                            <input id="name" type="text" placeholder="The Heralds of Newman"/>

                            <h3>YEAR</h3>
                            <input id="year" type="text" placeholder="2564"/>

                            <h3>LOCATION</h3>
                            <input id="location" type="text" placeholder="Yandark"/>

                            <button style={{ alignSelf: 'flex-start' }} onClick={this.handleClick}>Create Campaign</button>
                        </div>

                        <div id="inputs" className="vertical">
                            <h3>BACKGROUND</h3>
                            <textarea style={{ height: '100%' }} id="desc" type="paragraph" placeholder="The Heralds of Newman are a group of nomads whom seek justice for the people of Arkan. They..."/>
                        </div>
                    </div>                  
                </div>
            </div>
        );
    }
}

