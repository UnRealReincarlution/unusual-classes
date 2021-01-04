let quill;
let lastDebounce = new Date();

class LoreCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { props: props, synced: false };

        this.publishLore = this.publishLore.bind(this);
        this.debounceLore = this.debounceLore.bind(this);
    }

    publishLore() {
        db.doc(`${localStorage.getItem("lore")}/lore/${this.state.docId}`).update({ 
            title: $("#title").val(),
            body: quill.root.innerHTML,
            type: 'published',
            simple_body: quill.getText()
        });

        window.location.href = window.location.origin + "/campaign"
    }

    updateLore() {
        this.setState({ synced: false });
        lastDebounce = new Date();

        setTimeout(this.debounceLore, 2500);
    }

    debounceLore() {
        if(new Date() - lastDebounce > 2500) {
            db.doc(localStorage.getItem("editing_lore")).update({ 
                body: quill.root.innerHTML, 
                title: $("#title").val(),
                simple_body: quill.getText()
            });

            this.setState({ synced: true });
        }
    }

    createLore(user) {
        let loc = `${localStorage.getItem("lore")}/lore`;

        console.log(loc);

        db.collection(loc).add({
            title: "N/A",
            body: "",
            author: user.uid,
            type: 'draft',
            simple_body: ""
        }).then(e => {
            this.setState({ docId: e.id });
            localStorage.setItem("editing_lore", `${localStorage.getItem("lore")}/lore/${e.id}`);
        })
    }

    loadLore(user) {
        let loc = localStorage.getItem("editing_lore");

        db.doc(loc).get().then(e => {
            console.log(e);

            this.setState({ docId: e.id, synced: true });
            
            $("#title").val(e.data().title);
            quill.root.innerHTML = e.data().body;
        })
    }

    render() {
        return (
            <div className="item_page_dynamic header_content">
                <h1>{"TITLE"}</h1>

                <div id="input">
                    <div id="editor"></div>

                    <div className="linear marginLess" style={ { justifyContent: 'space-between', padding: '15px' } }>
                        <button onClick={this.publishLore}>Publish</button>

                        <div className={(this.state.synced) ? "linear center marginLess syncStatus synced" : "linear center marginLess syncStatus not_synced"}>
                            <div className={(this.state.synced) ? "connected" : "not_connected"}></div>
                            <h3 style={{ letterSpacing: 'normal' }}>{(this.state.synced) ? "SYNCED" : "SYNCING"}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(window.performance.navigation.type == 1) {
                this.loadLore(user);
            }else if(!this.props.edit && user) this.createLore(user);
        });
    }
}

ReactDOM.render(<LoreCreate edit={false}/>, document.getElementById("content"))