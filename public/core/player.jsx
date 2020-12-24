function getDocument(callback, document_to_load) {
    db.doc(document_to_load).get()
    .then(dc => {
        callback(dc.data());
        return dc.data();
    });
}

class PlayerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;

        this.showClassesModal = this.showClassesModal.bind(this);

        let document_to_load = localStorage.getItem("renderCharacter");
    }

    componentDidMount() {
        let document_to_load = localStorage.getItem("renderCharacter");

        if(_params.get("renderCharacter") == undefined) {
            window.href = window.origin;
        }

        this.getData(document_to_load);
    }

    async getData(document_to_load) {
        try {
            const response = await db.doc(document_to_load).get();
            this.setState({ data: response.data(), items: [] });
        } catch (err) {
            return [];
        }
    }

    showClassesModal() {
        let string_val = localStorage.getItem("renderCharacter");
        let doc_loc = string_val.slice(0, string_val.search("players"));
        console.log(`(${doc_loc}classes) where name == ${this.state.data.class}`);

        db.doc(doc_loc).collection(`classes`).where("name", "==", this.state.data.class)
            .get()
            .then(qs => {
                qs.forEach(e => {
                    console.log(e.data());
                })
            });
    }

    render() {
        if(this.state.data) {
            let map = [];
            let doc = this.state.data;

            for (const [key, value] of Object.entries(doc.stats)) {
                map.push({
                    a: key,
                    b: value
                })
            }

            doc.items.forEach(async value => {
                await db.doc(value.path).get().then(e => {
                    let arr = this.state.items.push(e.data());
                    this.setState({ items: arr });
                });
            });

            return (
                <div className="item_page_dynamic">
                    <div className="header_content item_dynamic height30">
                        <div className="lel vertical center box marginLess height30 gap15 item_dynamic">
                            <h1 style={ { fontSize: '4em', margin: '0' } } >{doc.name}</h1>

                            <div className="item_dynamic linear width100 playerStatsDirect" style={{ padding: '0px', width: '100%', fontWeight: '400' }}>
                                <h3 style={{ fontWeight: '400' }}>Level {doc.level}</h3>

                                <h3 style={{ fontWeight: '400' }}>{doc.health.cur_health} / {doc.health.max_health} HP</h3> 

                                <h3>{doc.race}</h3>
                                
                                <h3>{doc.gender}</h3>

                                <h3 className="documentOutlineSlight" style={{ width: 'fit-content' }} onClick={this.showClassesModal}>{doc.class.toUpperCase()}</h3>
                            </div>
                        </div>
                        

                        <div className="linear center box marginLess height50 gap15 item_dynamic lel">
                            {/* <div className="lightChildren item_dynamic vertical center jcenter marginLess health">
                                <h3 style={ { fontSize: '1.6em', fontWeight: '800' } }>{doc.health.cur_health}</h3>
                                <h4>{doc.health.max_health} HP</h4>
                            </div> */}

                            <div className="item_dynamic vertical center gap15" style={ { padding: '0px 25px 0px 25px', gap: '5px', marginRight: '15px' } }>
                                <h4 className="documentOutlineSlight" style={ { backgroundColor: 'rgba(108, 206, 74 , 0.2)', color: 'rgba(108, 206, 74, 0.8)' } }>Heal</h4>
                                <input className="documentOutlineSlight" type="number" style={ { backgroundColor: 'rgba(215, 223, 213, 0.2)', color: 'rgba(100, 100, 100, 0.8)', border: 'none', width: '100%' } } placeholder="10"></input>
                                <h4 className="documentOutlineSlight">Damage</h4>
                            </div>

                            {
                                map.map(d => {
                                    return (
                                        <div className="primaryStat" style={ {textAlign: 'center', padding: '5px'} }>
                                            <h4 style={ {fontSize: '2em'} }>{d.b}</h4>
                                            <h5 style={ {textTransform: 'uppercase', fontWeight: '400', letterSpacing: '1px'} }>{d.a}</h5>
                                        </div>
                                    );
                                })
                            }   
                        </div>
                    </div>
                    
                    <div>
                        <div className="linear gapNormal paddingNormal" style={ { width: "100%" } }>
                            <div className="vertical half1">
                                <div className="linear center space_between">
                                    <h2>Equipment</h2>
                                    <h3 style={ { fontWeight: '300', fontSize: '.8em' } }>{doc.equipment.current_size}kg / {doc.equipment.max_size + doc.equipment.max_adjustment}kg</h3>
                                    <a href="./list?v=items">ALL {'>'}</a>
                                </div>
                                
                                <List props={this.state.items} type="item"></List>
                            </div>

                            <div className="vertical half2">
                                <div className="linear center space_between">
                                    <h2>Status Effects</h2>
                                    <a href="./list?v=characters">ALL {'>'}</a>
                                </div>
                                
                                <List props={[]} type="player"></List>
                            </div>
                        </div>
                    </div>
                </div>
            );   
        }else {
            return (
                <div>
                    <div className="center jcenter vertical" style={{ height: '100%' }}>
                        <div className="sk-cube-grid">
                            <div className="sk-cube sk-cube1"></div>
                            <div className="sk-cube sk-cube2"></div>
                            <div className="sk-cube sk-cube3"></div>
                            <div className="sk-cube sk-cube4"></div>
                            <div className="sk-cube sk-cube5"></div>
                            <div className="sk-cube sk-cube6"></div>
                            <div className="sk-cube sk-cube7"></div>
                            <div className="sk-cube sk-cube8"></div>
                            <div className="sk-cube sk-cube9"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

ReactDOM.render(<PlayerPage/>, document.getElementById('content'));