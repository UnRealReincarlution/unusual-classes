function getDocument(callback, document_to_load) {
    db.doc(document_to_load).get()
    .then(dc => {
        callback(dc.data());
        return dc.data();
    });
}

class CampaignPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props };
        this.state.props = this.state.props.props;

        this.closeModal = this.closeModal.bind(this);
        this.setModalData = this.setModalData.bind(this);
        this.loadStateData = this.loadStateData.bind(this);
        this.showClassesModal = this.showClassesModal.bind(this);
    }

    componentDidMount() {
        let document_to_load = localStorage.getItem("renderCampaign");

        if(localStorage.getItem("renderCampaign") == undefined) {
            window.href = window.origin;
        }

        console.log(document_to_load)

        this.getData(document_to_load);
    }

    async getData(document_to_load) {
        try {
            const response = await db.doc(document_to_load).get();
            this.setState({ data: response.data(), players: [], classes: [], lore: [], modalIsOpen: false, modalData: {} });

            console.log(response.data());

            let players = [...this.state.players];
            
            db.collection(`${document_to_load}/players`).get().then(q => {
                q.forEach(a => players.push( {a: a.data(), b: `${document_to_load}/players/${a.id}` }));

                this.setState({ players: players });
                this.forceUpdate();
            })  

            let classes = [...this.state.classes];
            
            db.collection(`${document_to_load}/classes`).get().then(q => {
                q.forEach(a => classes.push( {a: a.data(), b: `${document_to_load}/classes/${a.id}` }));

                this.setState({ classes: classes });
                this.forceUpdate();
            })  

            let lore = [...this.state.lore];
            
            db.collection(`${document_to_load}/lore`).where("type", "==", "published").get().then(q => {
                q.forEach(a => lore.push( {a: a.data(), b: `${document_to_load}/lore/${a.id}` }));

                this.setState({ lore: lore });
                this.forceUpdate();
            })  

            db.collection(`${document_to_load}/lore`).where("type", "==", "draft")
            .where("author", "==", auth.currentUser.uid)
            .get().then(q => {
                q.forEach(a => lore.push( {a: a.data(), b: `${document_to_load}/lore/${a.id}` }));

                this.setState({ lore: lore });
                this.forceUpdate();
            })

            //this.loadStateData("lore");

            // For Next Time.... -> Load all of the DRAFTS with a DRAFT Tag
            //                   -> Add Redirect Links for Viewable Content to load content directly.
            //                   -> Add the ability to view &/ edit a lore page
            //                   -> Properly format View page

        } catch (err) {
            return [];
        }
    }

    loadStateData(data) {   
        let array = [];

        db.collection(`${document_to_load}/${data}`).get().then(q => {
            q.forEach(a => array.push( {a: a.data(), b: `${document_to_load}/${data}/${a.id}` }));

            this.setState({ [`${array}`]: array });
            this.forceUpdate();
        }) 
    }

    showClassesModal() {
        $("#content").css("overflow", "hidden");

        this.setState({ modalIsOpen: true });
        this.forceUpdate();

        // db.doc(doc_loc).collection(`classes`).where("name", "==", this.state.data.class)
        //     .get()
        //     .then(qs => {
        //         qs.forEach(e => {
        //             this.setState({ modalIsOpen: true });
        //             this.setState({ modalData: e.data() });
        //             this.forceUpdate();
        //         })
        //     });
    }

    setModalData(data) {
        this.setState({ modalData: data });
    }

    closeModal() {
        $("#content").css("overflow", "auto");
        this.setState({ modalIsOpen: false });
    }

    render() {        
        if(this.state.data) {
            return (
                <div className="item_page_dynamic relativePage">
                    <ClassModal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} data={this.state.modalData} type="view-only"/>
                    
                    <div className="header_content item_dynamic vertical">
                        <div className="vertical box marginLess gap15 item_dynamic heightFit" style={ { width: '100%' } }>
                            <h1>{this.state.data.name}</h1>
                            <p style={ { width: '100%' } }>{this.state.data.desc}</p>
                        </div>
                        
                        <div className="linear width100" style={ { width: '100%', height: '100%' } }>
                            <div className="vertical gapNormal paddingNormal width100" style={ { width: '100%' } }>
                                <div className="vertical" style={ {  height: '100%' } }>
                                    <div className="linear center space_between">
                                        <h2>Characters</h2>
                                        
                                        <a href="./list?v=characters">ALL {'>'}</a>
                                    </div>
                                    
                                    <List props={this.state.players} type="player"></List>
                                </div>

                                <div className="vertical" style={ {  height: '100%' } }>
                                    <div className="linear center space_between">
                                        <h2>Classes</h2>
                                    </div>
                                    
                                    <List props={this.state.classes} type="class" showModal={this.showClassesModal} setModalData={this.setModalData}></List>
                                </div>
                            </div>

                            <div className="vertical gapNormal paddingNormal" style={ { width: "100%" } }>
                                <div className="vertical">
                                    <div className="linear center space_between">
                                        <h2>Lore</h2>
                                        
                                        <a href="./create_lore" onClick={() => {localStorage.setItem("lore", localStorage.getItem("renderCampaign"))}}>Create {'>'}</a>
                                    </div>
                                    
                                    <List props={this.state.lore} type="lore"></List>
                                </div>
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
}

ReactDOM.render(<CampaignPage/>, document.getElementById('content'));